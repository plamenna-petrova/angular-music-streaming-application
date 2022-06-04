import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './content/components/albums/albums.component';
import { TracksComponent } from './content/components/tracks/tracks.component';

const routes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'tracks',
    component: TracksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
