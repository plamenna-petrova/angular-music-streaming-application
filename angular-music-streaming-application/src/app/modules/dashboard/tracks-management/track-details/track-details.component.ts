import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'src/app/core/models/track.model';
import { take } from 'rxjs';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})
export class TrackDetailsComponent implements OnInit {

  id!: number;

  track!: Track;

  constructor(private tracksService: TracksService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this.tracksService.getTrackById$(this.id).pipe(
      take(1)
    ).subscribe((response) => {
      this.track = response;
    });
  }

}
