// screen1.component.ts

import { Component } from '@angular/core';
import { ProcessService } from '../process.service';
import { Process } from '../models/process.model';
import { Router} from '@angular/router';


@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component {
  processName: string = ''; // Default value is an empty string
  cycleTime: number = 0;    // Default value is 0
  workDuration: number = 0; // Default value is 0
  processService: ProcessService;

  constructor(processService: ProcessService, private router: Router) {
    const process = processService.getProcess();
    this.processName = process.name;
    this.cycleTime = process.cycleTime;
    this.workDuration = process.workDuration;
    this.processService = processService;
  }


  isFormValid(): boolean {
    return this.processName.trim() !== '' && this.cycleTime > 0 && this.workDuration > 0;
  }

  confirm(): void {
      // Create a new Process using form data
      const newProcess: Process = {
        name: this.processName,
        cycleTime:  this.cycleTime,
        workDuration:  this.workDuration,
        tasks: []
      };

      // Add the new Process to the process list using the ProcessService
      this.processService.addProcess(newProcess);

      // Save the process list to localStorage
      this.processService.saveProcessesToLocalStorage();

      // Redirect to Screen2Component
      this.router.navigate(['/screen2']);
  }
}