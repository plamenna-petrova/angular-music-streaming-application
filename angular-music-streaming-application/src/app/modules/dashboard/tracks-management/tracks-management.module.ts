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
import { MatCardModule } from '@angular/material/card';
import { TrackCreateComponent } from './track-create/track-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackEditComponent } from './track-edit/track-edit.component';
import { TrackDeleteComponent } from './track-delete/track-delete.component';
import { TrackDetailsComponent } from './track-details/track-details.component';

@NgModule({
  declarations: [
    TracksManagementComponent,
    TrackCreateComponent,
    TrackEditComponent,
    TrackDeleteComponent,
    TrackDetailsComponent
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
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TracksManagementModule { }
