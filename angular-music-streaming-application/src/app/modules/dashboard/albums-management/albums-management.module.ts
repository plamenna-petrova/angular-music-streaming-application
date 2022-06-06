import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsManagementRoutingModule } from './albums-management-routing.module';
import { AlbumsManagementComponent } from './albums-management.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { AlbumEditDialogComponent } from './album-edit-dialog/album-edit-dialog.component';

@NgModule({
  declarations: [
    AlbumsManagementComponent,
    AlbumEditDialogComponent
  ],
  imports: [
    CommonModule,
    AlbumsManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule
  ]
})
export class AlbumsManagementModule { }
