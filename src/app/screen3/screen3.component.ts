import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../process.service';
import { Task } from '../models/task.model';
import { Process } from '../models/process.model';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component {
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
  ) {
  }

  ngOnInit(): void {
    this.process = this.processService.getProcess()
    this.tasks = this.process.tasks;
    this.processName = this.process.name;
    this.cycleTime = this.process.cycleTime;
    this.workDuration = this.process.workDuration;
  }

  editTask(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      // Get the selected task from the tasks array
      const selectedTask = this.tasks[index];
      const selectedProcess = new Process(this.processName, this.cycleTime, this.workDuration); // #FIXME Replace '11' with dynamic value equal to number of OMNI-RES options

      // Navigate to Screen 2 with the selected task's information
      // Pass the selected task index as a parameter in the URL
      this.router.navigate(['/screen2', { index: index,process:JSON.stringify(selectedProcess), task: JSON.stringify(selectedTask) }]);
    }
  }

  addTask(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      // Create an empty task to populate the Create Task screen with
      const selectedTask = new Task("", Array(11).fill(0), 0, ""); // #FIXME Replace '11' with dynamic value equal to number of OMNI-RES options
      const selectedProcess = new Process(this.processName, this.cycleTime, this.workDuration); // #FIXME Replace '11' with dynamic value equal to number of OMNI-RES options

      // Navigate to Screen 2 with the selected task's information
      // Pass the selected task index as a parameter in the URL
      this.router.navigate(['/screen2', { index: index, process:JSON.stringify(selectedProcess), task: JSON.stringify(selectedTask) }]);
    }
  }

  confirmDeleteTask(index: number): void {
    const taskToDelete = this.tasks[index];
    const confirmation = confirm(`Are you sure you want to delete Task ${index + 1}, ${taskToDelete.name}?`);
    if (confirmation) {
      this.processService.deleteTask(this.process, index);
      this.tasks = this.processService.getTasks(this.process); // Update the tasks array after deletion
    }
  }

  // Update process with input information and save.
  updateProcess(){
    this.process.processName = this.processName;
    this.process.cycleTime   = this.cycleTime;
    this.process.workDuration= this.workDuration;
    this.processService.saveProcessesToLocalStorage();
  }

  toggleView() {
    if (this.isEditMode) {
      // Navigate to Screen4
      this.router.navigate(['/screen4']); // Update with your actual route path for Screen4
    }
  }
  
}
