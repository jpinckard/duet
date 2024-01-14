// screen_process-create.component.ts

import { Component } from '@angular/core';
import { ProcessService } from '../process.service';
import { Process } from '../models/process.model';
import { Router} from '@angular/router';
import { UtilityService } from '../utility.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-screen_process-create',
  templateUrl: './screen_process-create.component.html',
  styleUrls: ['./screen_process-create.component.scss']
})
export class ScreenProcessCreateComponent {
  processName: string = ''; // Default value is an empty string
  cycleTime: number = 0;    // Default value is 0
  workDuration: number = 0; // Default value is 0
  processService: ProcessService;
  utilityService: UtilityService;
   
  constructor(processService: ProcessService, private router: Router, utilityService: UtilityService) {
    const process = new Process("", 0, 0, []);
    this.processName = process.name;
    this.cycleTime = process.cycleTime;
    this.workDuration = process.workDuration;
    this.processService = processService;
    this.utilityService = utilityService;
  }

  ngOnInit(): void {
    const process = new Process("", 0, 0, []);
    this.processName = process.name;
    this.cycleTime = process.cycleTime;
    this.workDuration = process.workDuration;
    this.processService = this.processService;
  }
  

  isFormValid(): boolean {
    return this.processName.trim() !== '' && this.cycleTime > 0 && this.workDuration > 0;
  }

  confirm(): void {
      // Create a new Process using form data
      const newProcess: Process = {
        name: this.processName,
        cycleTime:  this.utilityService.clampValue(this.cycleTime, 0, this.utilityService.maxCycleTime),
        workDuration:  this.utilityService.clampValue( this.workDuration, 0, this.utilityService.maxWorkDuration),
        tasks: []
      };

      // Add the new Process to the process list using the ProcessService
      this.processService.addProcess(newProcess);

      // Set the current process.
      this.processService.setCurrentProcess(newProcess);

      // Redirect to selected process screen
      this.router.navigate(['/screen_process-selected']);
  }

  cancel(): void {
    this.router.navigate(['/screen_process-manager']);
  }

  @HostListener('document:click')
  clickout() {
    this.cycleTime    = this.utilityService.clampValue(this.cycleTime, 0, this.utilityService.maxCycleTime),
    this.workDuration = this.utilityService.clampValue( this.workDuration, 0, this.utilityService.maxWorkDuration)
  }
}