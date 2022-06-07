import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album-delete-dialog',
  templateUrl: './album-delete-dialog.component.html',
  styleUrls: ['./album-delete-dialog.component.scss']
})
export class AlbumDeleteDialogComponent implements OnInit {

  @Output()
  public deletedAlbum = new EventEmitter<void>();

  album!: Album;

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AlbumDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { album: Album }) {
    this.album = this.data.album;
  }

  deleteAlbum(): void {
    this.albumsService.delete$(this.album.id).pipe(
      take(1)
    ).subscribe(() => {
      this.toastr.success('Album successfully deleted.', 'Success');
      this.closeDialog();
      this.deletedAlbum.emit();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
