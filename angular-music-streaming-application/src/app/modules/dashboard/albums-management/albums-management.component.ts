import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-albums-management',
  templateUrl: './albums-management.component.html',
  styleUrls: ['./albums-management.component.scss']
})
export class AlbumsManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(location.pathname);
  }

}
