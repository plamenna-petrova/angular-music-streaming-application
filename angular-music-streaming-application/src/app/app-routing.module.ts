import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlbumsComponent } from './content/components/albums/albums.component';
import { DashboardComponent } from './content/components/dashboard/dashboard.component';
import { HomeComponent } from './content/components/home/home.component';
import { TracksComponent } from './content/components/tracks/tracks.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tracks',
    component: TracksComponent,
    canActivate: [AuthGuard]
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
