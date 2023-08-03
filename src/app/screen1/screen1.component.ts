// screen1.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component {
  processName: string = ''; // Default value is an empty string
  cycleTime: number = 0;    // Default value is 0
  workDuration: number = 0; // Default value is 0

  onFormSubmit(): void {
    // Logic to handle form submission
    console.log('Form submitted:', this.processName, this.cycleTime, this.workDuration);
  }

  isFormValid(): boolean {
    return this.processName.trim() !== '' && this.cycleTime > 0 && this.workDuration > 0;
  }
}