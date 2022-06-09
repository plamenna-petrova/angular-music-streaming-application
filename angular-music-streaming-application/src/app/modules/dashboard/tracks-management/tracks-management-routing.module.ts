import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksCreateComponent } from './tracks-create/tracks-create.component';
import { TracksManagementComponent } from './tracks-management.component';

const routes: Routes = [
  {
    path: '',
    component: TracksManagementComponent,
  },
  {
    path: 'create-track',
    component: TracksCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksManagementRoutingModule { }
