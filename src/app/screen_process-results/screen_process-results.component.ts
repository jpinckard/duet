// screen_process-results.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../process.service';
import { Task } from '../models/task.model';
import { Process } from '../models/process.model';

@Component({
  selector: 'app-screen_process-results',
  templateUrl: './screen_process-results.component.html',
  styleUrls: ['./screen_process-results.component.scss']
})
export class ScreenProcessResultsComponent implements OnInit {
  processName: string = 'No Process Defined - Return to Home'; // Replace with your process name
  cycleTime: number = 0; // Replace with your cycle time value
  workDuration: number = 0; // Replace with your work duration value
  injuryProbability: number = 0;
  tasks: Task[] = []; // Replace with the tasks associated with the process
  isEditMode: boolean = true; 
  process: any;
  categoryColor: string[];

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categoryColor = ["#00de13", "#66e100", "#93e400", "#b7e600", "#d7e700", "#e7da00", "#f4cd00", "#ffbf00", "#ffa000", "#ff7e00", "#ff0000"];
  }

  ngOnInit(): void {
    this.process = this.processService.getProcess();
    this.tasks = this.processService.getTasks(this.process);
    this.processName = this.process.name;
    this.cycleTime   = this.process.cycleTime;
    this.workDuration= this.process.workDuration;
    this.injuryProbability = this.processService.getInjuryProbability(this.process);

    this.processService.tasksUpdatePercentContribution(this.process);
  }


  toggleView() {
    if (!this.isEditMode) {
      this.router.navigate(['/screen_process-selected']);
    }
  }

  // Function to download processes as a CSV file
  downloadCSV(): void {
    const csvData = this.convertProcessesToCSV(this.processService.getProcesses());
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processes.csv';
    a.click();

    // Clean up resources
    window.URL.revokeObjectURL(url);
  }
  
  // Function to convert processes array to CSV format with detailed task information
  convertProcessesToCSV(processes: Process[]): string {
    const csvRows: string[] = [];
    var taskRows: string[] = [];

    // Add CSV header row
    const processHeader = [
      'Process Name',
      'Cycle Time',
      'Work Duration',
      'Injury Probability'
    ];

    const taskHeader = [
      'Task Name',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      'Percent Contribution'
    ];

    // Add CSV data rows
    processes.forEach(process => {
      // Write process header
      csvRows.push(processHeader.join(','));
      const processRow = [
        process.name,
        process.cycleTime,
        process.workDuration,
        this.processService.getInjuryProbability(process)
      ];
      // Write process row
      csvRows.push(processRow.join(','));
      
      // Write task header
      csvRows.push(taskHeader.join(','));
      process.tasks.forEach(task => {
        const taskRow = [
          task.name,
          ...task.omniResReps,
          task.percentContribution
        ];
        csvRows.push(taskRow.join(','));
      });

      console.log(taskRows);
      //csvRows.push([processRow.concat(taskRows)].join(','));
      taskRows = [];
      });

      return csvRows.join('\n');
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
}