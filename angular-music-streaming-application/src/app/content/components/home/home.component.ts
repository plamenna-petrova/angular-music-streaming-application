import { Component, OnInit } from '@angular/core';

import { MastheadHeaderComponent } from '../../layout/masthead-header/masthead-header.component';
import { AlbumsCatalogueComponent } from './albums-catalogue/albums-catalogue.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
