import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { IAlbum } from 'src/app/core/interfaces/IAlbum';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { AlbumDeleteDialogComponent } from './album-delete-dialog/album-delete-dialog.component';
import { AlbumEditDialogComponent } from './album-edit-dialog/album-edit-dialog.component';

@Component({
  selector: 'app-albums-management',
  templateUrl: './albums-management.component.html',
  styleUrls: ['./albums-management.component.scss']
})
export class AlbumsManagementComponent implements AfterViewInit {

  albums!: Album[];
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'performer',
    'genre',
    'coverImageUrl',
    'numberOfTracks',
    'description',
    'releaseDate',
    'popularity',
    'editAlbum',
    'deleteAlbum'
  ];

  dataSource = new MatTableDataSource<IAlbum>(this.albums);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private albumsService: AlbumsService, private dialog: MatDialog) {

  }

  onCreateClick(): void {
    this.onEditClick();
  }

  onEditClick(id?: number): void {
    const dialogRef = this.dialog.open(AlbumEditDialogComponent, {
      width: '800px',
      data: {
        id: id
      }
    });

    dialogRef.componentInstance.createdAlbum.pipe(
      take(1)
    ).subscribe(() => {
      this.getAllAlbums();
    });
  }

  onDeleteClick(album: Album): void {
    const dialogRef = this.dialog.open(AlbumDeleteDialogComponent, {
      data: {
        album: album
      }
    });

    dialogRef.componentInstance.deletedAlbum.pipe(
      take(1)
    ).subscribe(() => {
      this.getAllAlbums();
    });
  }

  private getAllAlbums(): void {
    this.albumsService.getAllAlbums$().pipe(
      take(1)
    ).subscribe((response) => {
      this.albums = response;
      this.dataSource.data = this.albums;
    });
  }

  ngOnInit() {
    this.getAllAlbums();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



