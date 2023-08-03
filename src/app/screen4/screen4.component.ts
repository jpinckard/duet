// screen4.component.ts

import { Component } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.css']
})
export class Screen4Component {
  processName: string = 'Sample Process'; // Replace with your process name
  cycleTime: number = 30; // Replace with your cycle time value
  workDuration: number = 5; // Replace with your work duration value
  tasks: Task[] = []; // Replace with the tasks associated with the process
  percentContributions: number[] = Array(this.tasks.length).fill(0); // Initialize with 0

  isEditMode: boolean = false; // Tracks whether the component is in edit mode

  validatePercentContribution(index: number): void {
    // Ensure that the percent contribution value is within the valid range (0 to 100)
    if (this.percentContributions[index] < 0) {
      this.percentContributions[index] = 0;
    } else if (this.percentContributions[index] > 100) {
      this.percentContributions[index] = 100;
    }
  }

  onUploadResults(): void {
    // Logic to handle uploading results (emailing or downloading)
    // For demonstration purposes, we'll just log the percent contributions for now
    console.log('Percent Contributions:', this.percentContributions);
  }
}