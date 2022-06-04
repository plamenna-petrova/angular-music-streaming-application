import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { navigateToComponent } from 'src/utils/navigationFunctions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear!: number

  constructor(private router: Router) {

  }

  navigateToSignInFormFromFooter() : void {
    navigateToComponent(this.router, '/login');
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
