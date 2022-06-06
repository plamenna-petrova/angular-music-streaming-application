import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksManagementComponent } from './tracks-management.component';

const routes: Routes = [{ path: '', component: TracksManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksManagementRoutingModule { }
