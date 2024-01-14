import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../process.service';
import { Task } from '../models/task.model';
import { Process } from '../models/process.model';
import { UtilityService } from '../utility.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-screen_process-selected',
  templateUrl: './screen_process-selected.component.html',
  styleUrls: ['./screen_process-selected.component.scss']
})
export class ScreenProcessSelectedComponent {
  processName: string = '';    
  cycleTime: number = 0;       
  workDuration: number = 0;    
  tasks: Task[] = [];          
  isEditMode: boolean = false; 
  formData: any;
  process: any;

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
  }

  ngOnInit(): void {
    this.process = this.processService.getProcess()
    this.tasks = this.process.tasks;
    console.log("Process Tasks: " + this.process.tasks.length);
    console.log("Process Name: " + this.process.name);
    this.processName = this.process.name;
    this.cycleTime = this.process.cycleTime;
    this.workDuration = this.process.workDuration;
  }

  editTask(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      // Get the selected task from the tasks array
      const selectedTask = this.tasks[index];
      const selectedProcess = this.processService.getProcess();

      // Navigate to Screen 2 with the selected task's information
      // Pass the selected task index as a parameter in the URL
      this.router.navigate(['/screen_task-create', { index: index,process:JSON.stringify(selectedProcess), task: JSON.stringify(selectedTask) }]);
    }
  }

  addTask(index: number): void {
    if (index >= 0 && (index == 0 || index < this.tasks.length)) {
      // Create an empty task to populate the Create Task screen with
      const selectedTask = new Task("", Array(11).fill(0), 0, ""); // #FIXME Replace '11' with dynamic value equal to number of OMNI-RES options
      const selectedProcess = this.process;//new Process(this.processName, this.cycleTime, this.workDuration); // #FIXME Replace '11' with dynamic value equal to number of OMNI-RES options

      // Update the current selected process. Doing this because 'addTask' is async, so it may not complete before we finish navigating to the next page - which could give us outdated information.
      this.updateProcess();

      // Navigate to Screen 2 with the selected task's information
      // Pass the selected task index as a parameter in the URL
      this.router.navigate(['/screen_task-create', { index: index, process:JSON.stringify(selectedProcess), task: JSON.stringify(selectedTask) }]);
    }
  }

  taskOrderUp(i:number):void{
    if (i+1 >= this.process.tasks.length){
      console.log("Can't move this task up!");
      return;
    }
    const taskTemp = this.process.tasks[i+1];
    this.process.tasks[i+1] = this.process.tasks[i];
    this.process.tasks[i] = taskTemp;
    this.updateProcess();
  }

  taskOrderDown(i:number):void{
    if (i-1 < 0){
      console.log("Can't move this task down!");
      return;
    }
    const taskTemp = this.process.tasks[i-1];
    this.process.tasks[i-1] = this.process.tasks[i];
    this.process.tasks[i] = taskTemp;
    this.updateProcess();
  }

  navigateProcessManager(){
    this.router.navigate(['/screen_process-manager']);

  }

  confirmDeleteTask(index: number): void {
    const taskToDelete = this.tasks[index];
    const confirmation = confirm(`Are you sure you want to delete Task ${index + 1}, ${taskToDelete.name}?`);
    if (confirmation) {
      this.processService.deleteTask(this.process, index);
      this.tasks = this.processService.getTasks(this.process); // Update the tasks array after deletion
      this.updateProcess();
    }
  }

  // Update process with input information and save.
  updateProcess(){
    this.cycleTime    = this.utilityService.clampValue(this.cycleTime, 0, this.utilityService.maxCycleTime);
    this.workDuration = this.utilityService.clampValue( this.workDuration, 0, this.utilityService.maxWorkDuration);

    this.process.processName  = this.processName;
    this.process.cycleTime    = this.cycleTime;
    this.process.workDuration = this.workDuration;

    // Update the current selected process. Doing this because 'addTask' is async, so it may not complete before we finish navigating to the next page - which could give us outdated information.
    this.processService.setCurrentProcess(this.process);
    this.processService.addProcess(this.process);
    this.processService.saveProcessesToLocalStorage();
  }

  toggleView() {
    if (this.isEditMode) {
      // Navigate to ScreenProcessResults
      this.router.navigate(['/screen_process-results']); // Update with your actual route path for ScreenProcessResults
    }
  }

  @HostListener('document:click')
  clickout() {
    this.cycleTime     = this.utilityService.clampValue(this.cycleTime, 0, this.utilityService.maxCycleTime);
    this.workDuration  = this.utilityService.clampValue( this.workDuration, 0, this.utilityService.maxWorkDuration);
  }
  
}
