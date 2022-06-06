import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';

@Component({
  selector: 'app-album-edit-dialog',
  templateUrl: './album-edit-dialog.component.html',
  styleUrls: ['./album-edit-dialog.component.scss']
})
export class AlbumEditDialogComponent implements OnInit {

  id!: number;
  album!: Album;

  formGroup!: FormGroup;

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AlbumEditDialogComponent>) {

  }

  closeDialog(): void {
    this.dialogRef.close('Album!');
  }

  private buildForm(album?: Album): void {
    if (!album) {
      album = new Album();
    }

    this.formGroup = this.formBuilder.group({
      name: [album.name, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.albumsService.getAlbumById$(this.id).pipe(
        take(1)
      ).subscribe((response) => {
        this.album = response;
        this.buildForm(response);
      });
    } else {
      this.buildForm();
    }
  }

}
