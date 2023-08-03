// screen2.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css']
})
export class Screen2Component {
  taskName: string = '';
  taskNotes: string = '';
  omniResValues: string[] = [
    'Extremely Easy', 'Easy', 'Somewhat Easy', 'Somewhat Hard', 'Hard', 'Extremely Hard'
  ];
  repsValues: number[] = Array(this.omniResValues.length).fill(0);

  onFormSubmit(): void {
    // Logic to handle form submission and creating a new Task
    const newTask = {
      name: this.taskName,
      notes: this.taskNotes,
      omniResReps: this.repsValues
    };
    // For demonstration purposes, we'll just log the new task object for now
    console.log('New Task:', newTask);
  }

  isFormValid(): boolean {
    // Check if the form is valid before enabling the "DONE" button
    return this.taskName.trim() !== '' && this.repsValues.every(val => val >= 0);
  }

  validateRepsValue(index: number): void {
    // Ensure that the REPS value is non-negative
    if (this.repsValues[index] < 0) {
      this.repsValues[index] = 0;
    }
  }

  incrementRepsValue(index: number): void {
    this.repsValues[index]++;
  }

  decrementRepsValue(index: number): void {
    if (this.repsValues[index] > 0) {
      this.repsValues[index]--;
    }
  }
}