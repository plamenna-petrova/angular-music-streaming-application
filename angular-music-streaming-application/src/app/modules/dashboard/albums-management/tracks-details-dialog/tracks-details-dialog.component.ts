import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/core/models/album.model';
import { Track } from 'src/app/core/models/track.model';

@Component({
  selector: 'app-tracks-details-dialog',
  templateUrl: './tracks-details-dialog.component.html',
  styleUrls: ['./tracks-details-dialog.component.scss']
})
export class TracksDetailsDialogComponent implements OnInit {
  tracks!: Track[];

  constructor(
    public tracksDetailsDialogRef: MatDialogRef<TracksDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public albumDialogData: { album: Album }) {
    this.tracks = this.albumDialogData.album.tracks;
  }

  closeTracksDetailsDialog() {
    this.tracksDetailsDialogRef.close();  
  }

  ngOnInit(): void {
    
  }
}