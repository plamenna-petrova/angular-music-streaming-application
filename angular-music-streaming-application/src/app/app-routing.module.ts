import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './content/components/albums/albums.component';
import { HomeComponent } from './content/components/home/home.component';
import { TracksComponent } from './content/components/tracks/tracks.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'tracks',
    component: TracksComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
