import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenProcessCreateComponent } from './screen_process-create/screen_process-create.component';
import { ScreenTaskCreateComponent } from './screen_task-create/screen_task-create.component';
import { ScreenProcessSelectedComponent } from './screen_process-selected/screen_process-selected.component';
import { ScreenProcessResultsComponent } from './screen_process-results/screen_process-results.component';
import { ScreenProcessManagerComponent } from './screen_process-manager/screen_process-manager.component';

import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { Process } from './models/process.model';
import { HeaderComponent } from './header/header.component';

// POPUPS
import { NotesPopupComponent } from './notes-popup/notes-popup.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DisableDoubleTapZoomDirective } from './disable-double-tap-zoom.directive';
import { InstructionsComponent } from './instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    ScreenProcessCreateComponent,
    ScreenTaskCreateComponent,
    ScreenProcessSelectedComponent,
    ScreenProcessResultsComponent,
    ScreenProcessManagerComponent,
    HeaderComponent,
    NotesPopupComponent,
    DisableDoubleTapZoomDirective,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
