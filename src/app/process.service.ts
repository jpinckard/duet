// process.service.ts

import { Injectable } from '@angular/core';
import { Process } from './models/process.model';
import { Task } from './models/task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private processes: Process[] = [];
  private taskService:TaskService;
  private cumulativeDamageCycle:number = 0;
  private cumulativeDamageTotal:number = 0;
  private injuryProbability:number = 0;

  constructor(taskService:TaskService) {
    // Retrieve processes from localStorage on service initialization
    this.retrieveProcessesFromLocalStorage();
    this.taskService = taskService;
  }

  addProcess(process: Process): void {
    this.processes.push(process);
    this.saveProcessesToLocalStorage(); // Save processes to localStorage
  }

  getProcesses(): Process[] {
    return this.processes;
  }

  getProcess(): Process {
    if (this.processes.length>0){
      return this.processes[0];
    }
    return new Process("No process defined.", 0, 0);
  }

  // Save processes to localStorage
  saveProcessesToLocalStorage(): void {
    localStorage.setItem('processes', JSON.stringify(this.processes));
  }

  // Retrieve processes from localStorage
  retrieveProcessesFromLocalStorage(): void {
    const storedProcesses = localStorage.getItem('processes');
    if (storedProcesses) {
      this.processes = JSON.parse(storedProcesses);
    }
  }

  // Add a task to a process, updating if the task with the same name exists
  addTask(process: Process, task: Task): void {
    const existingTaskIndex = process.tasks.findIndex(existingTask => existingTask.name === task.name);

    if (existingTaskIndex !== -1) {
      process.tasks[existingTaskIndex] = task; // Update the existing task with the new task data
    }
    else {
      process.tasks.push(task); // Task with the same name does not exist, add the new task
    }

    this.saveProcessesToLocalStorage(); // Save updated processes to localStorage
  }

  getTasks(process: Process): Task[] {
    return process.tasks;
  }

  // Save tasks to localStorage
  saveTasksToLocalStorage(process: Process): void {
    localStorage.setItem('tasks', JSON.stringify(process.tasks));
  }

  // Delete a task by index
  deleteTask(process: Process, index: number): void {
    if (index >= 0 && index < process.tasks.length) {
      process.tasks.splice(index, 1);
      this.saveProcessesToLocalStorage(); // Save updated tasks to localStorage
    }
  }

  // Retrieve tasks from localStorage
  retrieveTasksFromLocalStorage(process: Process): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      process.tasks = JSON.parse(storedTasks);
    }
  }
  
  getCumulativeDamageCycle(process:Process): number {
    // Step 1: Calculate cumulative damage (CD) for each task
    const tasks : Task[] = this.getTasks(process);
    this.cumulativeDamageCycle = 0;

    tasks.forEach(task => {
      this.cumulativeDamageCycle += this.taskService.getCumulativeDamage(task);
    });

    return this.cumulativeDamageCycle;
  }

  
  getPercentContribution(task: Task){
    return ((this.taskService.getCumulativeDamage(task) / this.getCumulativeDamageCycle(this.getProcess())) * 100)
  }

  // Update the percent contribution for all tasks associated with a process.
  tasksUpdatePercentContribution(process:Process){
    const tasks : Task[] = this.getTasks(process);

    tasks.forEach(task => {
      task.percentContribution = this.getPercentContribution(task);
    });

    process.tasks = tasks;

    this.saveTasksToLocalStorage(process);
  }

  getInjuryProbability(process:Process){
    // Step 1: Calculate cumulative damage (CD) for each task
    this.cumulativeDamageCycle = this.getCumulativeDamageCycle(process);

    this.cumulativeDamageTotal = this.cumulativeDamageCycle * process.workDuration * 3600 / process.cycleTime;

    const base = Math.E;
    const exponent = 0.573 + (0.747 * Math.log10(this.cumulativeDamageTotal));
    const dividend = Math.pow(base, exponent);

    this.injuryProbability =  (dividend / (1 + dividend)) * 100;

    return this.injuryProbability;
  }

  // Exponent should be 0.127944201007
  // Dividend should be 1.13648958595 

}
