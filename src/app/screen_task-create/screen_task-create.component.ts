import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'; // Import the ActivatedRoute module
import { ProcessService } from '../process.service';
import { Task } from '../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { NotesPopupComponent } from '../notes-popup/notes-popup.component';
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';


@Directive({
  selector: '[disableDoubleTapZoom]'
})
export class DisableDoubleTapZoomDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: Event): void {
    event.preventDefault();
  }
}


@Component({
  selector: 'app-screen_task-create',
  templateUrl: './screen_task-create.component.html',
  styleUrls: ['./screen_task-create.component.scss']
})
export class ScreenTaskCreateComponent {
  omniResValues: string[] = [
    '0: Extremely Easy', '1:', '2: Easy', '3: ', '4: Somewhat Easy', '5:','6: Somewhat Hard', '7:', '8: Hard', '9:', '10: Extremely Hard'
  ];
  repsValues: number[] = Array(this.omniResValues.length).fill(0);
  
  process:any;
  taskName: string = '';
  taskNotes: string = '';
  percentContribution: number = 0;
  maxReps:number=10000;
  newRepsValue:number=0;
  index:number= 0;
  isNotesPopupOpen: boolean = false;

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  )  {
  }

  ngOnInit(): void {
    this.process = this.processService.getProcess();

    // This is getting all of the parameters from the URL. Task index, task data...
    this.route.paramMap.subscribe(params => {
      const taskIndex = params.get('index');
      const taskData = params.get('task');

      if (taskIndex && taskData) {
        const index = parseInt(taskIndex, 10);
        const task: Task = JSON.parse(taskData);
        
        if (!isNaN(index) && index >= 0 && index < this.repsValues.length) {
          this.taskName = task.name;
          this.repsValues = task.omniResReps;
          this.percentContribution = task.percentContribution;
          this.taskNotes = task.notes;
        }
      }
    });
  }

  onFormSubmit(): void {
    // Create a new Task using form data
    const newTask: Task = {
      name: this.taskName,
      omniResReps: this.repsValues,
      percentContribution:0,
      notes:this.taskNotes
    };

    // Add the new Task to the task list using the TaskService
    this.processService.addTask(this.process, newTask);

    // Update the current selected process. Doing this because 'addTask' is async, so it may not complete before we finish navigating to the next page - which could give us outdated information.
    this.processService.setCurrentProcess(this.process);
    
    // Redirect to ScreenProcessSelectedComponent
    this.router.navigate(['/screen_process-selected']);
  }

  cancel(): void{
      // Redirect to ScreenProcessSelectedComponent without making any changes.
      this.router.navigate(['/screen_process-selected']);
  }

  isFormValid(): boolean {
    // Check if the form is valid before enabling the "DONE" button
    return this.taskName.trim() !== '' && this.repsValues.every(val => val >= 0);
  }

  private resetForm(): void {
    this.taskName = '';
    this.taskNotes = '';
    this.repsValues.fill(0);
  }


  // Function to update REPS value for a specific OMNI-RES option
  updateReps(index: number, event: Event): void {
    this.index=index;
    const inputElement = event.target as HTMLInputElement;
    this.newRepsValue = parseInt(inputElement.value, 10);

    // Ensure the input is a valid number
    if (!isNaN(this.newRepsValue)) {
      this.repsValues[index] = this.newRepsValue;
    }

    this.validateRepsValue(index);
  }

  validateRepsValue(index: number): void {
    // Ensure that the REPS value is non-negative
    if (this.repsValues[index] < 0) {
      this.repsValues[index] = 0;
    } 
    
    if (this.repsValues[index] > this.maxReps) {
      this.repsValues[index] = this.maxReps;
    }
  }

  incrementRepsValue(index: number): void {
    this.index=index;
    this.repsValues[index]+=1;
    this.validateRepsValue(index);
  }

  decrementRepsValue(index: number): void {
    this.index=index;
    this.repsValues[index] -= 1;
    this.validateRepsValue(index);
  }

  // Open the notes popup
  openNotesPopup(): void {
    // Only open a new popup if there is not currently a notes popup
    if (this.isNotesPopupOpen == true){return;}

     const dialogRef = this.dialog.open(NotesPopupComponent, {
      width: '100%',
      height: '100%',
       data: { notes: this.taskNotes } // Initial notes value
     });

    this.isNotesPopupOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result (saved notes)
      if (result) {
        this.taskNotes = result; // Update task notes if changed in the dialog
        this.isNotesPopupOpen = false;
      }
    });
  }

  @HostListener('document:click')
  clickout() {
    console.log("INDEX:", this.index);
    this.validateRepsValue(this.index);
  }
}