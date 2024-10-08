import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { take } from "rxjs";
import { Album } from 'src/app/core/models/album.model';
import { IAlbum } from 'src/app/core/interfaces/IAlbum.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public AlbumsDisplayTypeEnum = AlbumsDisplayType;

  albumsDisplayType: AlbumsDisplayType = AlbumsDisplayType.table;

  albums!: Album[];

  displayedAlbumsColumns: string[] = [
    'id',
    'name',
    'type',
    'performer',
    'genres',
    'coverImageUrl',
    'numberOfTracks',
    'description',
    'releaseDate',
    'popularity',
  ];

  albumsDataSource = new MatTableDataSource<IAlbum>(this.albums);

  constructor(private albumsService: AlbumsService) {

  }

  reduceAlbumDescriptionLength(description: string) {
    description = description.substring(0, 30) + "...";
    return description;
  }

  ngOnInit(): void {
    this.albumsService.getAllEntities$().pipe(
      take(1)
    ).subscribe((response) => {
      this.albums = response;
      this.albumsDataSource.data = this.albums;
    })
  }
}

export enum AlbumsDisplayType {
  table,
  list,
  grid
}
