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
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrackCreateComponent } from './track-create/track-create.component';
import { TrackEditComponent } from './track-edit/track-edit.component';
import { TrackDeleteComponent } from './track-delete/track-delete.component';
import { TrackDetailsComponent } from './track-details/track-details.component';

import { SharedModule } from '../../shared/shared.module';

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
    MatSortModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TracksManagementModule { }
