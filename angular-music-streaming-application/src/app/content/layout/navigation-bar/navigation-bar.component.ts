import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navigateToComponent } from 'src/utils/navigationFunctions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  projectLogoPath!: String;

  constructor(private router: Router) {

  }

  navigateToSignInPage(): void {
    navigateToComponent(this.router, 'login');
  }

  ngOnInit(): void {
    this.projectLogoPath = "../../../../assets/images/rockstodons-logo-removebg-preview.png";
  }
}
