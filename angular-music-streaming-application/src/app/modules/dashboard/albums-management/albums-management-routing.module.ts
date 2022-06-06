import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsManagementComponent } from './albums-management.component';

const routes: Routes = [{ path: '', component: AlbumsManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsManagementRoutingModule { }
