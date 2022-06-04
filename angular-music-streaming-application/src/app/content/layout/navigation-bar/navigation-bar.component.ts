import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  projectLogoPath!: String;
  isCollapsed!: Boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.projectLogoPath = "../../../../assets/images/rockstodons-logo-removebg-preview.png";
  }
}
