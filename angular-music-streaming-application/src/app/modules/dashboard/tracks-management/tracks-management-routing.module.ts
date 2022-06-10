import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackCreateComponent } from './track-create/track-create.component';
import { TrackDeleteComponent } from './track-delete/track-delete.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { TrackEditComponent } from './track-edit/track-edit.component';
import { TracksManagementComponent } from './tracks-management.component';

const routes: Routes = [
  {
    path: '',
    component: TracksManagementComponent,
  },
  {
    path: 'create-track',
    component: TrackCreateComponent
  },
  {
    path: 'track-details/:id',
    component: TrackDetailsComponent
  },
  {
    path: 'edit-track/:id',
    component: TrackEditComponent
  },
  {
    path: 'delete-track/:id',
    component: TrackDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksManagementRoutingModule { }
