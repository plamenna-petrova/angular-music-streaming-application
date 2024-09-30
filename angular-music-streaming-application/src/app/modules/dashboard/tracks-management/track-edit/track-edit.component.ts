import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, Observable, take, tap } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { Track } from 'src/app/core/models/track.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-tracks-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.scss']
})
export class TrackEditComponent implements OnInit {
  id!: number;
  trackToUpdate!: Track;
  albums!: Album[];
  trackUpdateForm!: FormGroup;

  albumControl = new FormControl(null, Validators.required);
  filteredAlbumNames!: Observable<Album[]>;

  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  submitTrackUpdateForm() {
    if (this.trackUpdateForm.invalid) {
      this.toastr.error(`Errors found in some of the input values`, `Sorry, cannot submit form!`);
      return;
    }

    let editTrackRequestBody = {
      ...this.trackUpdateForm.value,
      albumId: this.albumControl.value.id  
    }

    if (this.albumControl.errors) {
      return;
    }

    if (this.albumControl.value.id === undefined) {
      if (!this.albumControl.touched) {
        editTrackRequestBody.albumId = this.trackToUpdate.album.id;
      } else {
        let albumToFind = this.albums.find(album => album.name === this.albumControl.value || this.albumControl.value.name);
        if (albumToFind) {
          editTrackRequestBody.albumId = albumToFind?.id;
        } else {
          this.toastr.error(`Wrong album! Please choose an album from the list!`);
          return;
        }
      }
    }

    if (editTrackRequestBody.albumId === undefined) {
      return;
    }

    editTrackRequestBody.id = this.trackToUpdate.id;
    editTrackRequestBody.lastUpdatedOn = new Date();

    this.tracksService.updateEntity$(editTrackRequestBody, editTrackRequestBody.id).pipe(
      take(1)
    ).subscribe((response) => {
      let editedTrack = response;
      this.toastr.success(`The track ${editedTrack.title} is successfully edited.`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  private buildTrackUpdateForm(track: Track) {
    this.trackUpdateForm = this.formBuilder.group({
      title: [track.title, [Validators.required, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(30)
      ])]],
      duration: [track.duration, [Validators.required]],
      performedLanguage: [track.performedLanguage, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30)
      ])]],
      isTrending: [track.isTrending]
    });
  }

  get title(): AbstractControl {
    return this.trackUpdateForm.get('title')!;
  }

  get duration(): AbstractControl {
    return this.trackUpdateForm.get('duration')!;
  }

  get performedLanguage(): AbstractControl {
    return this.trackUpdateForm.get('performedLanguage')!;
  }

  get isTrending(): AbstractControl {
    return this.trackUpdateForm.get('isTrending')!;
  }

  ngOnInit(): void {
    this.tracksService.getEntityById$(this.id).pipe(
      take(1)
    ).subscribe({
      next: response => {
        this.trackToUpdate = response;
        this.buildTrackUpdateForm(this.trackToUpdate);
      },
      error: error => console.log(error),
      complete: () => {
        this.albumsService.getAllEntities$().pipe(
          take(1)
        ).subscribe({
          next: response => {
            this.albums = response
          },
          error: error => console.log(error),
          complete: () => {
            this.albumControl.setValue({ name: this.trackToUpdate.album.name });
            this.filteredAlbumNames = this.albumControl.valueChanges.pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value?.name),
              map(albumName => albumName ? this.filterAlbums(albumName as string) : this.albums.slice()),
            )
          }
        });
      }
    });
  }

  displayAlbumName(album: Album): string {
    return album && album.name ? album.name : '';
  }

  private filterAlbums(name: string): Album[] {
    const filterValue = name.toLowerCase();
    return this.albums.filter(album => album.name.toLowerCase().includes(filterValue));
  }
}