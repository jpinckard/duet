import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../process.service';
import { Process } from '../models/process.model';
import { Task } from '../models/task.model';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-screen_process-manager',
  templateUrl: './screen_process-manager.component.html',
  styleUrls: ['./screen_process-manager.component.scss']
})
export class ScreenProcessManagerComponent { 
  processes: Process[] = [];          
  isEditMode: boolean = false; 
  formData: any;
  process: any;
  categoryColor: string[];

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
    this.process = this.processService.getProcess()
    this.processes = this.processService.getProcesses();
    this.categoryColor = ["#00de13", "#66e100", "#93e400", "#b7e600", "#d7e700", "#e7da00", "#f4cd00", "#ffbf00", "#ffa000", "#ff7e00", "#ff0000"]
  }
  


  ngOnInit(): void {
    this.process = this.processService.getProcess()
    this.processes = this.processService.getProcesses();
  }

  // Edit the selected process.
  editProcess(index: number): void {
    if (index >= 0 && index < this.processes.length) {
      // Get the selected process from the processes array
      const selectedProcess = new Process(this.processes[index].name, this.processes[index].cycleTime, this.processes[index].workDuration, this.processes[index].tasks);
      this.processService.addProcess(selectedProcess);
      this.processService.setCurrentProcess(selectedProcess);
      this.router.navigate(['/screen_process-selected']);
    }
  }

  // Add a new, empty process.
  addProcess(index: number): void {
    this.router.navigate(['/screen_process-create']);
    // if (index >= 0 && index < this.processes.length) {
    //   const selectedProcess = new Process("", 0, 0, []);
    //   this.processService.addProcess(selectedProcess);
    //   this.processService.setCurrentProcess(selectedProcess);
    //    this.router.navigate(['/screen_process-create']);
    // }
  }

  // Confirm you want to delete a process.
  confirmDeleteProcess(index: number): void {
    const processToDelete = this.processes[index];
    const confirmation = confirm(`Are you sure you want to delete Process ${index + 1}, ${processToDelete.name}?`);
    if (confirmation) {
      this.processService.deleteProcess(index);
      this.processes = this.processService.getProcesses(); // Update the processes array after deletion
    }
  }

  getInjuryProbabilityCategory(process:Process): number{
    const injuryProbability = this.processService.getInjuryProbability(process);

    if (injuryProbability <= 0){
      console.log("ERROR: 0 injury probability.");
      return 0;
    } else if (injuryProbability <=10){
      return 1;
    } else if (injuryProbability <=20){
      return 2;
    } else if (injuryProbability <=30){
      return 3;
    } else if (injuryProbability <=40){
      return 4;
    } else if (injuryProbability <=50){
      return 5;
    } else if (injuryProbability <=60){
      return 6;
    } else if (injuryProbability <=70){
      return 7;
    } else if (injuryProbability <=80){
      return 8;
    } else if (injuryProbability <=90){
      return 9;
    } else if (injuryProbability <=100){
      return 10;
    } else{
      console.log("ERROR! Injury probability is higher than 100%");
      return 10;
    }
  }

  // toggleView() {
  //   if (this.isEditMode) {
  //     // Navigate to ScreenProcessResults
  //     this.router.navigate(['/screen_process-results']); // Update with your actual route path for ScreenProcessResults
  //   }
  // }
  
}
