import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-album-description-dialog',
  templateUrl: './album-description-dialog.component.html',
  styleUrls: ['./album-description-dialog.component.scss']
})
export class AlbumDescriptionDialogComponent implements OnInit {

  albumDescription!: string;

  constructor( public albumDescriptionDialogRef: MatDialogRef<AlbumDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public albumDialogData: {description: string}) {
    this.albumDescription = this.albumDialogData.description;
    console.log(this.albumDescription);
  }

  ngOnInit(): void {
  }

}
