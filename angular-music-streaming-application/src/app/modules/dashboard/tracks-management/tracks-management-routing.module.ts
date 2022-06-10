import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksCreateComponent } from './tracks-create/tracks-create.component';
import { TracksDeleteComponent } from './tracks-delete/tracks-delete.component';
import { TracksEditComponent } from './tracks-edit/tracks-edit.component';
import { TracksManagementComponent } from './tracks-management.component';

const routes: Routes = [
  {
    path: '',
    component: TracksManagementComponent,
  },
  {
    path: 'create-track',
    component: TracksCreateComponent
  },
  {
    path: 'edit-track/:id',
    component: TracksEditComponent
  },
  {
    path: 'delete-track/:id',
    component: TracksDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksManagementRoutingModule { }
