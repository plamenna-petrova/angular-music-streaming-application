import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksManagementRoutingModule } from './tracks-management-routing.module';
import { TracksManagementComponent } from './tracks-management.component';


@NgModule({
  declarations: [
    TracksManagementComponent
  ],
  imports: [
    CommonModule,
    TracksManagementRoutingModule
  ]
})
export class TracksManagementModule { }
