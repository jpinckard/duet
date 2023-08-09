// notes-popup.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-popup',
  templateUrl: './notes-popup.component.html',
  styleUrls: ['./notes-popup.component.scss']
})
export class NotesPopupComponent {

  notes: string = 'Enter notes for the task here.';

  constructor(
    public dialogRef: MatDialogRef<NotesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.notes = data.notes; // Initialize notes with the provided value
  }

  onSaveClick(): void {
    // Save the notes and close the dialog
    this.dialogRef.close(this.notes);
  }

  onCancelClick(): void {
    // Close the dialog without saving
    this.dialogRef.close();
  }
}
