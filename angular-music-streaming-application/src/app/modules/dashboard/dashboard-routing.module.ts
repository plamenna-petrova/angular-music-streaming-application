import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'albums-management',
        loadChildren: () => import('./albums-management/albums-management.module').then(m => m.AlbumsManagementModule),
        outlet: 'dashboard'
      },
      { 
        path: 'tracks-management', 
        loadChildren: () => import('./tracks-management/tracks-management.module').then(m => m.TracksManagementModule),
        outlet: 'dashboard' 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }