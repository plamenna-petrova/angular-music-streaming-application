import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsManagementRoutingModule } from './albums-management-routing.module';
import { AlbumsManagementComponent } from './albums-management.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlbumCreateDialogComponent } from './album-create-dialog/album-create-dialog.component';
import { AlbumEditDialogComponent } from './album-edit-dialog/album-edit-dialog.component';
import { AlbumDeleteDialogComponent } from './album-delete-dialog/album-delete-dialog.component';
import { TracksDetailsDialogComponent } from './tracks-details-dialog/tracks-details-dialog.component';
import { AlbumDescriptionDialogComponent } from './album-description-dialog/album-description-dialog.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AlbumsManagementComponent,
    AlbumEditDialogComponent,
    AlbumDeleteDialogComponent,
    AlbumCreateDialogComponent,
    TracksDetailsDialogComponent,
    AlbumDescriptionDialogComponent,
  ],
  imports: [
    CommonModule,
    AlbumsManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MatDialogModule
  ]
})
export class AlbumsManagementModule { }
