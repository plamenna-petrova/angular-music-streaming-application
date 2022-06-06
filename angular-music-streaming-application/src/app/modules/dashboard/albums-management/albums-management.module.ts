import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsManagementRoutingModule } from './albums-management-routing.module';
import { AlbumsManagementComponent } from './albums-management.component';


@NgModule({
  declarations: [
    AlbumsManagementComponent
  ],
  imports: [
    CommonModule,
    AlbumsManagementRoutingModule
  ]
})
export class AlbumsManagementModule { }
