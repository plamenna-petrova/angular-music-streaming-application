import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take, timeout } from 'rxjs';
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
    public dialogRef: MatDialogRef<AlbumEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.id = this.data.id;
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
      description: [album.description, [Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(100)])]],
      releaseDate: [album.releaseDate, [Validators.required]],
      popularity: [album.popularity, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      const invalidAlbumFormControls = this.findInvalidFormControls();
      invalidAlbumFormControls.forEach(invalidControl => {
        switch (invalidControl) {
          case "name":
            this.toastr.error('Please enter the name of the album again!', 'Invalid album name');
            break;
          case "type":
            this.toastr.error('Please enter select the type of album again!', 'Invalid album type');
            break;
          case "performer":
            this.toastr.error('Please enter the performer of the album again', 'Invalid album performer');
            break;
          case "genre":
            this.toastr.error('Please enter the album genre again', 'Invalid album genre');
            break;
          case 'coverImageUrl':
            this.toastr.error('Please enter the cover image of the album again', 'Invalid album cover image url');
            break;
          case 'numberOfTracks':
            this.toastr.error('Please enter the number of tracks in the album again', 'Invalid number of tracks');
            break;
          case 'description':
            this.toastr.error('Please enter the description of the album again', 'Invalid album description');
            break;
          case 'releaseDate':
            this.toastr.error('Please enter the release date of the album again', 'Invalid album release date');
            break;
          case 'popularity':
            this.toastr.error('Please enter the popularity rate of the album again', 'Invalid album popularity rate');
            break;  
        }
      });
      this.formGroup.markAllAsTouched();
      return;
    }

    const body: Album = {
      ...this.album,
      ...this.formGroup.value
    };

    this.albumsService.saveAlbum$(body).pipe(
      take(1)
    ).subscribe((response) => {
      let newAlbum = response;
      this.toastr.success(`The Album ${newAlbum.name} by ${newAlbum.performer} is successfully saved.`, 'Success');
      this.closeDialog();
      this.createdAlbum.emit(response);
    });
  }

  findInvalidFormControls(): string[] {
    const invalidFormConrols = [];
    const controls = this.formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidFormConrols.push(name);
      }
    }
    return invalidFormConrols;
  }

  ngOnInit(): void {
    console.log("init dialog");
    console.log(this.id);
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
