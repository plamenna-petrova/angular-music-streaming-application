import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { IAlbum } from 'src/app/core/interfaces/IAlbum.interface';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { AlbumCreateDialogComponent } from './album-create-dialog/album-create-dialog.component';
import { AlbumDeleteDialogComponent } from './album-delete-dialog/album-delete-dialog.component';
import { AlbumDescriptionDialogComponent } from './album-description-dialog/album-description-dialog.component';
import { AlbumEditDialogComponent } from './album-edit-dialog/album-edit-dialog.component';
import { TracksDetailsDialogComponent } from './tracks-details-dialog/tracks-details-dialog.component';

@Component({
  selector: 'app-albums-management',
  templateUrl: './albums-management.component.html',
  styleUrls: ['./albums-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsManagementComponent implements AfterViewInit {

  albums!: Album[];

  displayedAlbumsColumns: string[] = [
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
    'tracks',
    'editAlbum',
    'deleteAlbum'
  ];

  albumsDataSource = new MatTableDataSource<IAlbum>(this.albums);

  @ViewChild(MatPaginator) albumsPaginator!: MatPaginator;

  constructor(private albumsService: AlbumsService, private albumDialog: MatDialog) {

  }

  onAlbumDescriptionClick(description: string): void {
    const albumDescriptionDialogRef = this.albumDialog.open(AlbumDescriptionDialogComponent, {
      width: '400px',
      data: {
        description: description
      }
    });
  }

  onTracksDetailsClick(album: Album): void {
    const tracksDetailsDialogRef = this.albumDialog.open(TracksDetailsDialogComponent, {
      width: '400px',
      data: {
        album: album
      }
    });
  }

  onCreateAlbumClick(): void {
    const albumCreationDialogRef = this.albumDialog.open(AlbumCreateDialogComponent, {
      width: '800px'
    });

    albumCreationDialogRef.componentInstance.createdAlbum.pipe(
      take(1)
    ).subscribe(() => {
      this.getAllAlbums();
    });
  }

  onEditAlbumClick(id: number): void {
    const albumEditingDialogRef = this.albumDialog.open(AlbumEditDialogComponent, {
      width: '800px',
      data: {
        id: id
      }
    });

    albumEditingDialogRef.componentInstance.updatedAlbum.pipe(
      take(1)
    ).subscribe(() => {
      this.getAllAlbums();
    });
  }

  onDeleteAlbumClick(album: Album): void {
    const albumDeletionDialogRef = this.albumDialog.open(AlbumDeleteDialogComponent, {
      data: {
        album: album
      }
    });

    albumDeletionDialogRef.componentInstance.deletedAlbum.pipe(
      take(1)
    ).subscribe(() => {
      this.getAllAlbums();
    });
  }

  private getAllAlbums(): void {
    this.albumsService.getAllEntities$('tracks', null).pipe(
      take(1)
    ).subscribe((response) => {
      this.albums = response;
      console.log(this.albums);
      this.albumsDataSource.data = this.albums;
    })
  }

  ngOnInit() {
    this.getAllAlbums();
  }

  ngAfterViewInit() {
    this.albumsDataSource.paginator = this.albumsPaginator;
  }
}



