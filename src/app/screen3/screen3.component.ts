// screen3.component.ts

import { Component } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component {
  processName: string = 'Sample Process'; // Replace with your process name
  cycleTime: number = 30; // Replace with your cycle time value
  workDuration: number = 5; // Replace with your work duration value
  tasks: Task[] = []; // Replace with the tasks associated with the process
  isEditMode: boolean = false; // Tracks whether the component is in edit mode

  editTask(index: number): void {
    // Logic to handle editing the selected task (Navigate to Screen 2 with populated information)
    // For demonstration purposes, we'll just log the task index for now
    console.log('Edit Task:', index);
  }

  confirmDeleteTask(index: number): void {
    // Logic to confirm deletion of the selected task
    // For demonstration purposes, we'll just log the task index for now
    console.log('Confirm Delete Task:', index);
  }
}