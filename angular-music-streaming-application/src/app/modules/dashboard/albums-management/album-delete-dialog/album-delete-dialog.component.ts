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

  albumToDelete!: Album;

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    public albumDeletionDialogRef: MatDialogRef<AlbumDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public albumDialogData: { album: Album }) {
    this.albumToDelete = this.albumDialogData.album;
  }

  deleteAlbum(): void {
    this.albumsService.delete$(this.albumToDelete.id).pipe(
      take(1)
    ).subscribe(() => {
      this.toastr.success(`The Album ${this.albumToDelete.name} by ${this.albumToDelete.performer} is successfully deleted.`, `Success`);
      this.closeDeleteAlbumDialog();
      this.deletedAlbum.emit();
    });
  }

  closeDeleteAlbumDialog() {
    this.albumDeletionDialogRef.close();
  }

  ngOnInit(): void {
  }

}
