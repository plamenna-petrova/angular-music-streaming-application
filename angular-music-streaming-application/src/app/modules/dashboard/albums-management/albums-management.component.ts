import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
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
    'popularity'
  ];

  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private albumsService: AlbumsService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([]);
  }

  onCreateClick(): void {
    this.onEditClick();
  }

  onEditClick(id?: number): void {
    const dialogRef = this.dialog.open(AlbumEditDialogComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.createdAlbum.pipe(
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
    console.log("data source");
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }
}

