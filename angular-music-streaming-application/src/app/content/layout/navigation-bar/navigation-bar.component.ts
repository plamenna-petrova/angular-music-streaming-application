import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(private router: Router, private authService: AuthService) {

  }

  navigateToSignInPageFromNavbar(): void {
    navigateToComponent(this.router, 'login');
  }

  logout(): void {
    console.log("logging out");
  }

  ngOnInit(): void {
    this.projectLogoPath = "../../../../assets/images/rockstodons-logo-removebg-preview.png";
    this.currentUser$ = this.authService.user$;
    console.log("passed user");
    console.log(this.currentUser$);
  }
}
