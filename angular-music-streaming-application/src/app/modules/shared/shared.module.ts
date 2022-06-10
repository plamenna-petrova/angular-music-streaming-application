import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLabelComponent } from './error-label/error-label.component';

import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    ErrorLabelComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [ErrorLabelComponent]
})
export class SharedModule { }
