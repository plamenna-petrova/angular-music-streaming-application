import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-album-genres-dialog',
  templateUrl: './album-genres-dialog.component.html',
  styleUrls: ['./album-genres-dialog.component.scss']
})
export class AlbumGenresDialogComponent implements OnInit {

  albumGenres!: string[];

  constructor(public albumGenresDialogRef: MatDialogRef<AlbumGenresDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public albumDialogData: {genres: string[]}) {
    this.albumGenres = this.albumDialogData.genres;
  }

  closeAlbumGenresDialog() {
    this.albumGenresDialogRef.close();
  }

  ngOnInit(): void {
    
  }

}
