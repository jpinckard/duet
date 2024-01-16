// instructions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ngx-extended-pdf-viewer';

import { InstructionsComponent } from './instructions.component';

@NgModule({
  declarations: [InstructionsComponent],
  imports: [
    CommonModule,
    PdfViewerModule, // Add this line
  ],
})
export class InstructionsModule {}
