import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  albumCreationForm!: FormGroup;

  createdAlbum = new EventEmitter<Album>();

  constructor(
    private albumsService: AlbumsService, 
    private toastr: ToastrService, 
    private formBuilder: FormBuilder, 
    public albumCreationDialogRef: MatDialogRef<AlbumCreateDialogComponent>) {
    this.buidAlbumCreationForm();  
  }

  buidAlbumCreationForm() {
    this.albumToCreate = new Album();
    this.albumCreationForm = this.formBuilder.group({
      name: [this.albumToCreate.name, [Validators.required, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50)
      ])]],
      type: [this.albumToCreate.type, [Validators.required]],
      performer: [this.albumToCreate.performer, [Validators.required, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50)
      ])]],
      genre: [this.albumToCreate.genre, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25)
      ])]],
      coverImageUrl: [this.albumToCreate.coverImageUrl, [Validators.required]],
      numberOfTracks: [this.albumToCreate.numberOfTracks, [Validators.required]],
      description: [this.albumToCreate.description, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(500)
      ])]],
      releaseDate: [this.albumToCreate.releaseDate, [Validators.required]],
      popularity: [this.albumToCreate.popularity, [Validators.required]],
    });
  }

  get name() {
    return this.albumCreationForm.get('name');
  }

  get type() {
    return this.albumCreationForm.get('type');
  }

  get performer() {
    return this.albumCreationForm.get('performer');
  }

  get genre() {
    return this.albumCreationForm.get('genre');
  }

  get coverImageUrl() {
    return this.albumCreationForm.get('coverImageUrl');
  }

  get numberOfTracks() {
    return this.albumCreationForm.get('numberOfTracks');
  }

  get description() {
    return this.albumCreationForm.get('description');
  }

  get releaseDate() {
    return this.albumCreationForm.get('releaseDate');
  }

  get popularity() {
    return this.albumCreationForm.get('popularity');
  }

  closeCreateAlbumDialog(): void {
    this.albumCreationDialogRef.close();
  }

  submitAlbumCreationForm(): void {
    if (this.albumCreationForm.invalid) {
      this.albumCreationForm.markAllAsTouched();
      return;
    }

    const albumCreationRequestBody: Album  = {
      ...this.albumCreationForm.value
    }

    this.albumsService.createAlbum$(albumCreationRequestBody).pipe(
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
