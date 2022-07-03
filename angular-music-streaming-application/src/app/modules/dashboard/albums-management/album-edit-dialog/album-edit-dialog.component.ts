import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  albumKeyInformationFormGroup!: FormGroup;
  albumDetailsFormGroup!: FormGroup;
  isLinear!: boolean;

  albumTypes = [
    "Studio",
    "Live",
    "Extended Play"
  ]

  popularityTypes = [
    "Low",
    "Medium",
    "High"
  ]

  updatedAlbum = new EventEmitter<Album>();

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public albumEditingDialogRef: MatDialogRef<AlbumEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public albumDialogData: { id: number }) {
    this.id = this.albumDialogData.id;
    this.isLinear = false;
  }

  private buildAlbumUpdateForm(album: Album): void {
    this.albumKeyInformationFormGroup = new FormGroup({
      name: new FormControl(album.name, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])),
      type: new FormControl(album.type, Validators.required),
      performer: new FormControl(album.performer, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])),
      genre: new FormControl(album.genre, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]))
    });
    this.albumDetailsFormGroup = new FormGroup({
      coverImageUrl: new FormControl(album.coverImageUrl, Validators.required),
      numberOfTracks: new FormControl(album.numberOfTracks, Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(20)
      ])),
      description: new FormControl(album.description, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ])),
      releaseDate: new FormControl(album.releaseDate, Validators.required),
      popularity: new FormControl(album.popularity, Validators.required)
    });
  }

  get name(): AbstractControl {
    return this.albumKeyInformationFormGroup.get('name')!;
  }

  get type(): AbstractControl {
    return this.albumKeyInformationFormGroup.get('type')!;
  }

  get performer(): AbstractControl {
    return this.albumKeyInformationFormGroup.get('performer')!;
  }

  get genre(): AbstractControl {
    return this.albumKeyInformationFormGroup.get('genre')!;
  }

  get coverImageUrl(): AbstractControl {
    return this.albumDetailsFormGroup.get('coverImageUrl')!;
  }

  get numberOfTracks(): AbstractControl {
    return this.albumDetailsFormGroup.get('numberOfTracks')!;
  }

  get description(): AbstractControl {
    return this.albumDetailsFormGroup.get('description')!;
  }

  get releaseDate(): AbstractControl {
    return this.albumDetailsFormGroup.get('releaseDate')!;
  }

  get popularity(): AbstractControl {
    return this.albumDetailsFormGroup.get('popularity')!;
  }

  closeEditAlbumDialog(): void {
    this.albumEditingDialogRef.close();
  }

  submitAlbumUpdateForm(): void {
    if (this.albumKeyInformationFormGroup.invalid) {
      this.albumKeyInformationFormGroup.markAllAsTouched();
      return;
    }

    if (this.albumDetailsFormGroup.invalid) {
      this.albumDetailsFormGroup.markAllAsTouched();
      return;
    }

    const updateAlbumRequestBody: Album = {
      ...this.albumToUpdate,
      ...this.albumKeyInformationFormGroup.value,
      ...this.albumDetailsFormGroup.value
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

