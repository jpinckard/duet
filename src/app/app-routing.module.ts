import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenProcessCreateComponent } from './screen_process-create/screen_process-create.component';
import { ScreenTaskCreateComponent } from './screen_task-create/screen_task-create.component';
import { ScreenProcessSelectedComponent } from './screen_process-selected/screen_process-selected.component';
import { ScreenProcessResultsComponent } from './screen_process-results/screen_process-results.component';
import { ScreenProcessManagerComponent } from './screen_process-manager/screen_process-manager.component';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  { path: '', component: ScreenProcessManagerComponent },
  { path: 'screen_process-create', component: ScreenProcessCreateComponent },
  { path: 'screen_task-create', component: ScreenTaskCreateComponent },
  { path: 'screen_process-selected', component: ScreenProcessSelectedComponent },
  { path: 'screen_process-results', component: ScreenProcessResultsComponent },
  { path: 'screen_process-manager', component: ScreenProcessManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]})
export class AppRoutingModule { }