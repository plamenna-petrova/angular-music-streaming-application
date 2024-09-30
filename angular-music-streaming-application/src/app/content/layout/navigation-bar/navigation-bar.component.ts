import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { navigateToComponent } from 'src/utils/navigationFunctions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  projectLogoPath!: String;
  currentUser$!: Observable<User | null>;
  currentUsername?: string;
  currentUserRole?: string;

  constructor(private router: Router, private authService: AuthService) {

  }

  navigateToSignInFormFromNavbar(): void {
    navigateToComponent(this.router, 'login');
  }

  logout(): void {
    this.authService.logout();
    this.navigateToSignInFormFromNavbar();
  }

  ngOnInit(): void {
    this.projectLogoPath = "../../../../assets/images/rockstodons-logo-removebg-preview.png";
    this.currentUser$ = this.authService.user$;
    
    this.currentUser$.subscribe(currentUser => {
      this.currentUsername = currentUser?.username;
      this.currentUserRole = currentUser?.role;
    });
  }
}
