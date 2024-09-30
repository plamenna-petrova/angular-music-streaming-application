import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ITrack } from 'src/app/core/interfaces/ITrack.interface';
import { Track } from 'src/app/core/models/track.model';
import { TracksService } from 'src/app/core/services/tracks.service';
import { compareObjectData } from 'src/utils/tokenHelper';

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
    'trackDetails',
    'editTrack',
    'deleteTrack'
  ]

  tracksDataSource = new MatTableDataSource<ITrack>(this.tracks);

  @ViewChild(MatPaginator) tracksPaginator!: MatPaginator;

  constructor(private tracksService: TracksService) {

  }

  private getAllTracks() {
    this.tracksService.getAllEntities$().subscribe(response => {
      this.tracks = response;
      this.tracksDataSource.data = this.tracks;
    });
  }

  sortTracksData(sort: Sort) {
    const data = this.tracksDataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.tracksDataSource.data = data;
    }

    this.tracksDataSource.data = data.sort((a, b) => {
      const isInAscendingOrder = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compareObjectData(a.id, b.id, isInAscendingOrder);
        case 'title':
          return compareObjectData(a.title, b.title, isInAscendingOrder);
        case 'duration':
          return compareObjectData(a.duration, b.duration, isInAscendingOrder);
        case 'performedLanguage':
          return compareObjectData(a.performedLanguage, b.performedLanguage, isInAscendingOrder);
        default:
          return 0;
      }
    });
  }

  ngOnInit(): void {
    this.getAllTracks();
  }

  ngAfterViewInit() {
    this.tracksDataSource.paginator = this.tracksPaginator;
  }
}