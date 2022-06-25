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
      numberOfTracks: [album.numberOfTracks, [Validators.required, Validators.compose([
        Validators.min(1),
        Validators.max(20)
      ])]],
      description: [album.description, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(500)
      ])]],
      releaseDate: [album.releaseDate, [Validators.required]],
      popularity: [album.popularity, [Validators.required]],
    });
  }

  get name(): AbstractControl {
    return this.albumUpdateForm.get('name')!;
  }

  get type(): AbstractControl {
    return this.albumUpdateForm.get('type')!;
  }

  get performer(): AbstractControl {
    return this.albumUpdateForm.get('performer')!;
  }

  get genre(): AbstractControl {
    return this.albumUpdateForm.get('genre')!;
  }

  get coverImageUrl(): AbstractControl {
    return this.albumUpdateForm.get('coverImageUrl')!;
  }

  get numberOfTracks(): AbstractControl {
    return this.albumUpdateForm.get('numberOfTracks')!;
  }

  get description(): AbstractControl {
    return this.albumUpdateForm.get('description')!;
  }

  get releaseDate(): AbstractControl {
    return this.albumUpdateForm.get('releaseDate')!;
  }

  get popularity(): AbstractControl {
    return this.albumUpdateForm.get('popularity')!;
  }

  closeEditAlbumDialog(): void {
    this.albumEditingDialogRef.close();
  }

  submitAlbumUpdateForm(): void {
    if (this.albumUpdateForm.invalid) {
      this.toastr.error(`Errors found in some of the input values`, `Sorry, cannot submit form!`);
      return;
    }

    const updateAlbumRequestBody: Album = {
      ...this.albumToUpdate,
      ...this.albumUpdateForm.value
    };

    updateAlbumRequestBody.lastUpdatedOn = new Date();

    this.albumsService.updateEntity$(updateAlbumRequestBody, updateAlbumRequestBody.id).pipe(
      take(1)
    ).subscribe((response) => {
      let editedAlbum = response;
      this.toastr.success(`The Album ${editedAlbum.name} by ${editedAlbum.performer} is successfully edited.`, 'Success');
      this.closeEditAlbumDialog();
      this.updatedAlbum.emit(response);
    });
  }

  ngOnInit(): void {
    this.albumsService.getEntityById$(this.id).pipe(
      first()
    ).subscribe((response) => {
      this.albumToUpdate = response;
      this.buildAlbumUpdateForm(this.albumToUpdate);
    });
  }

}
