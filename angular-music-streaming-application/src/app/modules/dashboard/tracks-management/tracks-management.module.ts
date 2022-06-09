import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksManagementRoutingModule } from './tracks-management-routing.module';
import { TracksManagementComponent } from './tracks-management.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TracksCreateComponent } from './tracks-create/tracks-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TracksManagementComponent,
    TracksCreateComponent
  ],
  imports: [
    CommonModule,
    TracksManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TracksManagementModule { }
