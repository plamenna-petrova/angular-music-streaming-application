import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { first, take, timeout } from 'rxjs';
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
  albumToUpdate!: Album;
  albumUpdateForm!: FormGroup;

  updatedAlbum = new EventEmitter<Album>();

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public albumEditingDialogRef: MatDialogRef<AlbumEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public albumDialogData: { id: number }) {
    this.id = this.albumDialogData.id;
  }

  private buildAlbumUpdateForm(album: Album): void {
    this.albumUpdateForm = this.formBuilder.group({
      name: [album.name, [Validators.required, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50)
      ])]],
      type: [album.type, [Validators.required]],
      performer: [album.performer, [Validators.required, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50)
      ])]],
      genre: [album.genre, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25)
      ])]],
      coverImageUrl: [album.coverImageUrl, [Validators.required]],
      numberOfTracks: [album.numberOfTracks, [Validators.required]],
      description: [album.description, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100)
      ])]],
      releaseDate: [album.releaseDate, [Validators.required]],
      popularity: [album.popularity, [Validators.required]],
    });
  }

  get name() {
    return this.albumUpdateForm.get('name');
  }

  get type() {
    return this.albumUpdateForm.get('type');
  }

  get performer() {
    return this.albumUpdateForm.get('performer');
  }

  get genre() {
    return this.albumUpdateForm.get('genre');
  }

  get coverImageUrl() {
    return this.albumUpdateForm.get('coverImageUrl');
  }

  get numberOfTracks() {
    return this.albumUpdateForm.get('numberOfTracks');
  }

  get description() {
    return this.albumUpdateForm.get('description');
  }

  get releaseDate() {
    return this.albumUpdateForm.get('releaseDate');
  }

  get popularity() {
    return this.albumUpdateForm.get('popularity');
  }

  closeEditAlbumDialog(): void {
    this.albumEditingDialogRef.close();
  }

  submitAlbumUpdateForm(): void {
    if (this.albumUpdateForm.invalid) {
      this.albumUpdateForm.markAllAsTouched();
      return;
    }

    const updateAlbumRequestBody: Album = {
      ...this.albumToUpdate,
      ...this.albumUpdateForm.value
    };

    this.albumsService.updateAlbum$(updateAlbumRequestBody).pipe(
      take(1)
    ).subscribe((response) => {
      let editedAlbum = response;
      this.toastr.success(`The Album ${editedAlbum.name} by ${editedAlbum.performer} is successfully edited.`, 'Success');
      this.closeEditAlbumDialog();
      this.updatedAlbum.emit(response);
    });
  }

  ngOnInit(): void {
    this.albumsService.getAlbumById$(this.id).pipe(
      first()
    ).subscribe((response) => {
      this.albumToUpdate = response;
      this.buildAlbumUpdateForm(this.albumToUpdate);
    });
  }

}
