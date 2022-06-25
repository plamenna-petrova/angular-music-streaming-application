import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITrack } from 'src/app/core/interfaces/ITrack.interface';
import { Track } from 'src/app/core/models/track.model';
import { TracksService } from 'src/app/core/services/tracks.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  tracks!: Track[];

  displayedTracksColumns: string[] = [
    'id',
    'title',
    'duration',
    'albumName',
    'albumCoverImage',
    'performedLanguage',
    'isTrending'
  ];

  tracksDataSource = new MatTableDataSource<ITrack>(this.tracks);

  constructor(private tracksService: TracksService) {

  }

  ngOnInit(): void {
    this.tracksService.getAllEntities$(null, 'album').pipe(
      take(1)
    ).subscribe((response) => {
      this.tracks = response;
      this.tracksDataSource.data = this.tracks;
    })
  }

}
