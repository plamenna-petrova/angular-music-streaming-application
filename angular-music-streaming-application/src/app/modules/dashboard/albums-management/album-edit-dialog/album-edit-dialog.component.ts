import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album-edit-dialog',
  templateUrl: './album-edit-dialog.component.html',
  styleUrls: ['./album-edit-dialog.component.scss']
})
export class AlbumEditDialogComponent implements OnInit {

  id!: number;
  album!: Album;

  formGroup!: FormGroup;

  createdAlbum = new EventEmitter<Album>();

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AlbumEditDialogComponent>) {
    this.buildForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private buildForm(album?: Album): void {
    if (!album) {
      album = new Album();
    }

    this.formGroup = this.formBuilder.group({
      name: [album.name, [Validators.required, Validators.minLength(2)]],
      type: [album.type, [Validators.required]],
      performer: [album.performer, [Validators.required, Validators.minLength(2)]],
      genre: [album.genre, [Validators.required, Validators.minLength(3)]],
      coverImageUrl: [album.coverImageUrl, [Validators.required]],
      numberOfTracks: [album.numberOfTracks, [Validators.required]],
      description: [album.description, [Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(10)])]],
      releaseDate: [album.releaseDate, [Validators.required]],
      popularity: [album.popularity, [Validators.required]],
    });
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit(): void {
    console.log("submitting form");

    if (this.formGroup.invalid) {
      console.log(this.formBuilder);
      console.log("invalid form group");
      let invalidControls = this.findInvalidControls();
      console.log("invalid controls");
      console.log(invalidControls);
      this.formGroup.markAllAsTouched();
      return;
    }

    const body: Album = {
      ...this.album,
      ...this.formGroup.value
    };

    console.log("form body");
    console.log(body);

    this.albumsService.saveAlbum$(body).pipe(
      take(1)
    ).subscribe((response) => {
      this.toastr.success(`Album ${response.name} successfully created.`, 'Success');
      this.closeDialog();
      this.createdAlbum.emit(response);
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
