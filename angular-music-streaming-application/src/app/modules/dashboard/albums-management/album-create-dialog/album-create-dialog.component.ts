import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';

@Component({
  selector: 'app-album-create-dialog',
  templateUrl: './album-create-dialog.component.html',
  styleUrls: ['./album-create-dialog.component.scss']
})
export class AlbumCreateDialogComponent implements OnInit {

  albumToCreate!: Album;
  albumKeyInformationFormGroup!: FormGroup;
  albumDetailsFormGroup!: FormGroup;
  isLinear!: boolean;

  albumType: Record<AlbumType, string> = {
    studio: 'Studio',
    live: 'Live',
    ep: 'Extended Play'
  }

  popularityTypes: PopularityType = {
    [PopularityTypeEnum.low]: "Low",
    [PopularityTypeEnum.medium]: "Medium",
    [PopularityTypeEnum.high]: "High"
  }

  createdAlbum = new EventEmitter<Album>();

  constructor(
    private albumsService: AlbumsService,
    private toastr: ToastrService,
    public albumCreationDialogRef: MatDialogRef<AlbumCreateDialogComponent>) {
    this.buidAlbumCreationForm();
    this.isLinear = false;
    console.log(this.popularityTypes);
  }

  buidAlbumCreationForm() {
    this.albumToCreate = new Album();
    this.albumKeyInformationFormGroup = new FormGroup({
      name: new FormControl(this.albumToCreate.name, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])),
      type: new FormControl(this.albumToCreate.type, Validators.required),
      performer: new FormControl(this.albumToCreate.performer, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])),
      genre: new FormControl(this.albumToCreate.genre, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]))
    });
    this.albumDetailsFormGroup = new FormGroup({
      coverImageUrl: new FormControl(this.albumToCreate.coverImageUrl, Validators.required),
      numberOfTracks: new FormControl(this.albumToCreate.numberOfTracks, Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(20)
      ])),
      description: new FormControl(this.albumToCreate.description, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ])),
      releaseDate: new FormControl(this.albumToCreate.releaseDate, Validators.required),
      popularity: new FormControl(this.albumToCreate.popularity, Validators.required)
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

  closeCreateAlbumDialog(): void {
    this.albumCreationDialogRef.close();
  }

  submitAlbumCreationForm(): void {
    if (this.albumKeyInformationFormGroup.invalid) {
      this.albumKeyInformationFormGroup.markAllAsTouched();
      return;
    }

    if (this.albumDetailsFormGroup.invalid) {
      this.albumDetailsFormGroup.markAllAsTouched();
      return;
    }

    const albumCreationRequestBody: Album = {
      ...this.albumKeyInformationFormGroup.value,
      ...this.albumDetailsFormGroup.value
    }

    albumCreationRequestBody.createdOn = new Date();
    albumCreationRequestBody.lastUpdatedOn = new Date();

    this.albumsService.createEntity$(albumCreationRequestBody).pipe(
      take(1)
    ).subscribe((response) => {
      console.log(response);
      let newAlbum = response;
      this.toastr.success(`The album ${newAlbum.name} by ${newAlbum.performer} is successfully created`, `Success`);
      this.closeCreateAlbumDialog();
      this.createdAlbum.emit(response);
    });
  }

  ngOnInit(): void {

  }

}

export type AlbumType = "studio" | "live" | "ep"

enum PopularityTypeEnum {
  low,
  medium,
  high
}

export type PopularityType = Partial<Record<PopularityTypeEnum, string>>;











