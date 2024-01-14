/*
Author: Joy Pinckard

PROCESS SERVICE
Handles data manipulation for processes.
*/

import { Injectable } from '@angular/core';
import { Process } from './models/process.model';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { UtilityService } from './utility.service';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class ProcessService {
  private processes: Process[] = [];
  private currentProcess : Process; // The process being edited.
  private taskService:TaskService;
  private cumulativeDamageCycle:number = 0;
  private cumulativeDamageTotal:number = 0;
  private injuryProbability:number = 0;

  constructor(
    taskService:TaskService,
    private router: Router,
    private utilityService: UtilityService) {
      this.retrieveProcessesFromLocalStorage();
      this.taskService = taskService;
      this.currentProcess = this.getProcess()
  }

  // Add a new process. All processes must have unique names
  addProcess(process: Process): void {

    const existingProcessIndex = this.processes.findIndex(existingProcess => existingProcess.name === process.name);

    if (existingProcessIndex !== -1) {
      this.processes[existingProcessIndex] = process; // Update the existing process with the new process data
    }
    else {
      this.processes.push(process); // Process with the same name does not exist, add the new process
    }

    console.log(JSON.stringify(this.processes))

    this.currentProcess = process;

    this.saveProcessesToLocalStorage(); // Save processes to localStorage
  }

  // Delete a process by index
  deleteProcess(index: number): void {
    if (index >= 0 && index < this.processes.length) {
      this.processes.splice(index, 1);
      this.saveProcessesToLocalStorage(); // Save updated processes to localStorage
    }
  }

  // Get all processes.
  getProcesses(): Process[] {
    return this.processes;
  }

  // Get the first process in the list.
  getProcess(): Process {
    // If there is no selected process
    if (this.currentProcess == null){
      // If there are defined processes
      if (this.processes.length > 0){
        this.currentProcess = this.processes[0];
        sessionStorage.setItem('currentProcess', JSON.stringify(this.currentProcess));
      }
      // If there are no defined processes
      else{
        console.log("No process defined. Please create a new process.");        
        // Redirect to ScreenTaskCreateComponent
        this.router.navigate(['/screen_process-create']);
      }
    }

    const p = sessionStorage.getItem('currentProcess');
    if (p){ this.currentProcess = JSON.parse(p); }

    return this.currentProcess;
  }

  // Save processes to localStorage
  saveProcessesToLocalStorage(): void {
    sessionStorage.setItem('processes', JSON.stringify(this.processes));
  }

  // Retrieve processes from localStorage
  retrieveProcessesFromLocalStorage(): void {
    const storedProcesses = sessionStorage.getItem('processes');
    if (storedProcesses) {
      this.processes = JSON.parse(storedProcesses);
    }
  }

  // Sets the process that is currently being edited.
  setCurrentProcess(process: Process): void {
    this.currentProcess = process;
    console.log("Current process: ", process.name);
    sessionStorage.setItem('currentProcess', JSON.stringify(this.currentProcess));
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

    
    this.addProcess(process);

    //this.saveProcessesToLocalStorage(); // Save updated processes to sessionStorage
  }

  // Get all tasks associated with a process.
  getTasks(process: Process): Task[] {
    return process.tasks;
  }

  // Save tasks to localStorage
  saveTasksToLocalStorage(process: Process): void {
    sessionStorage.setItem('tasks', JSON.stringify(process.tasks));
  }

  // Delete a task by index
  deleteTask(process: Process, index: number): void {
    if (index >= 0 && index < process.tasks.length) {
      process.tasks.splice(index, 1);
      this.addProcess(process);
      this.saveProcessesToLocalStorage(); // Save updated tasks to sessionStorage
    }
  }

  // Retrieve tasks from local storage.
  retrieveTasksFromLocalStorage(process: Process): void {
    const storedTasks = sessionStorage.getItem('tasks');
    if (storedTasks) {
      process.tasks = JSON.parse(storedTasks);
    }
  }

  // Get the cumulative damage (cycle) for a given process.
  getCumulativeDamageCycle(process:Process): number {
    const tasks : Task[] = this.getTasks(process);
    this.cumulativeDamageCycle = 0;

    tasks.forEach(task => {
      this.cumulativeDamageCycle += this.taskService.getCumulativeDamage(task);
    });

    return this.cumulativeDamageCycle;
  }

  // Get the percent contribution of a given task.
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

  // Algorithm to get the probability of injury for a given process.
  getInjuryProbability(process:Process){
    this.cumulativeDamageCycle = this.getCumulativeDamageCycle(process);

    this.cumulativeDamageTotal = this.cumulativeDamageCycle * process.workDuration * 3600 / process.cycleTime;

    const base = Math.E;
    const exponent = 0.573 + (0.747 * Math.log10(this.cumulativeDamageTotal));
    const dividend = Math.pow(base, exponent);

    this.injuryProbability =  (dividend / (1 + dividend)) * 100;

    return this.injuryProbability;
  }


  // Sets all members of a process while ensuring that they stay within the desired range.
  setProcessValues(process:Process, name: string, cycleTime: number, workDuration: number): void {
    process.name = name;
    process.cycleTime = this.utilityService.clampValue(cycleTime, 0, this.utilityService.maxCycleTime);
    process.workDuration = this.utilityService.clampValue(workDuration, 0, this.utilityService.maxWorkDuration);

    this.addProcess(process);
  }
}
