import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ITrack } from 'src/app/core/interfaces/ITrack.interface';
import { Track } from 'src/app/core/models/track.model';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-tracks-management',
  templateUrl: './tracks-management.component.html',
  styleUrls: ['./tracks-management.component.scss']
})
export class TracksManagementComponent implements OnInit {

  tracks!: Track[];

  displayedTracksColumns: string[] = [
    'id',
    'title',
    'duration',
    'albumName',
    'albumCoverImage',
    'performedLanguage',
    'isTrending',
    'editTrack',
    'deleteTrack'
  ]

  tracksDataSource = new MatTableDataSource<ITrack>(this.tracks);

  @ViewChild(MatPaginator) tracksPaginator!: MatPaginator;

  constructor(private tracksService: TracksService, private router: Router) {

  }

  private getAllTracks() {
    this.tracksService.getAllTracks$().subscribe(response => {
      this.tracks = response;
      console.log(this.tracks);
      this.tracksDataSource.data = this.tracks;
    });
  }

  ngOnInit(): void {
    this.getAllTracks();
  }

  ngAfterViewInit() {
    this.tracksDataSource.paginator = this.tracksPaginator;
  }

}
