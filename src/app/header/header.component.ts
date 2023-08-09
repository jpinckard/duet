import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) { }

  openAccount(): void {
    // Implement logic to open the Account section
  }

  openInstructions(): void {
    // Implement logic to open the Instructions section
  }

  openReferences(): void {
    // Implement logic to open the References section
  }

  logout(): void {
    // Implement logic to log out the user
  }

}
