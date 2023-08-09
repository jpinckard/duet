// screen4.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../process.service';
import { Task } from '../models/task.model';
import { Process } from '../models/process.model';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.css']
})
export class Screen4Component implements OnInit {
  processName: string = 'No Process Defined - Return to Home'; // Replace with your process name
  cycleTime: number = 0; // Replace with your cycle time value
  workDuration: number = 0; // Replace with your work duration value
  injuryProbability: number = 0;
  tasks: Task[] = []; // Replace with the tasks associated with the process
  isEditMode: boolean = true; 
  process: any;

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute) {
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
      this.router.navigate(['/screen3']);
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
    const taskRows: string[] = [];

    // Add CSV header row
    const header = [
      'Process Name',
      'Cycle Time',
      'Injury Probability'
    ];

    const taskHeader = [
      'Task Name',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      'Percent Contribution'
    ];

    // Add CSV data rows
    //processes.forEach(process => {
      const process = this.processService.getProcess();
      const processRow = [
        process.name,
        process.cycleTime,
        process.workDuration
      ];

      process.tasks.forEach(task => {
        const taskRow = [
          task.name,
          ...task.omniResReps,
          task.percentContribution
        ];
        taskRows.push(taskRow.join(','));
        header.push(taskHeader.join(','));
      });

      console.log(taskRows);

      csvRows.push(header.join(','));
      csvRows.push([processRow.concat(taskRows)].join(','));

      //});

      return csvRows.join('\n');
    }
}