import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masthead-header',
  templateUrl: './masthead-header.component.html',
  styleUrls: ['./masthead-header.component.scss']
})
export class MastheadHeaderComponent implements OnInit {
  mastheadBackgroundImageUrl!: String

  constructor() {

  }

  ngOnInit(): void {
    this.mastheadBackgroundImageUrl = "../../../../assets/images/pexels-edward-eyer-811838.jpg";
  }
}
