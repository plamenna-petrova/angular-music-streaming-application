import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

import { navigateToComponent } from 'src/utils/navigationFunctions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear!: number;
  currentUser$!: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService) {

  }

  navigateToSignInFormFromFooter(): void {
    navigateToComponent(this.router, '/login');
  }

  logout(): void {
    this.authService.logout();
    this.navigateToSignInFormFromFooter();
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.currentUser$ = this.authService.user$;
  }
}
