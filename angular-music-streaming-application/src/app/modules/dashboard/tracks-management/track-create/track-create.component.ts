import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, Observable, take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { Track } from 'src/app/core/models/track.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-tracks-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.scss']
})
export class TrackCreateComponent implements OnInit {
  trackToCreate!: Track;
  albums!: Album[];
  trackCreationForm!: FormGroup;
  filteredAlbumNames!: Observable<Album[]>;

  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.buildTrackCreationForm();
  }

  submitTrackCreationForm() {
    if (this.trackCreationForm.invalid) {
      this.trackCreationForm.markAllAsTouched();
      return;
    }

    const createTrackRequestBody: Track = {
      ...this.trackCreationForm.value
    }

    createTrackRequestBody.createdOn = new Date();
    createTrackRequestBody.lastUpdatedOn = new Date();

    this.tracksService.createEntity$(createTrackRequestBody).pipe(
      take(1)
    ).subscribe((response) => {
      let newTrack = response;
      let albumForTrack = this.albums.find(album => album.id === newTrack.albumId);
      this.toastr.success(`The track ${newTrack.title} from the album ${albumForTrack!.name} by ${albumForTrack!.performer} is successfully created.`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  private buildTrackCreationForm() {
    this.trackToCreate = new Track();
    this.trackCreationForm = this.formBuilder.group({
      title: [this.trackToCreate.title, [Validators.required, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(30)
      ])]],
      duration: [this.trackToCreate.duration, [Validators.required]],
      albumId: [this.trackToCreate.albumId, Validators.required],
      performedLanguage: [this.trackToCreate.performedLanguage, [Validators.required, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30)
      ])]],
      isTrending: [this.trackToCreate.isTrending]
    });
  }

  get title(): AbstractControl {
    return this.trackCreationForm.get('title')!;
  }

  get duration(): AbstractControl {
    return this.trackCreationForm.get('duration')!;
  }

  get albumId(): AbstractControl {
    return this.trackCreationForm.get('albumId')!;
  }

  get performedLanguage(): AbstractControl {
    return this.trackCreationForm.get('performedLanguage')!;
  }

  get isTrending(): AbstractControl {
    return this.trackCreationForm.get('isTrending')!;
  }

  ngOnInit(): void {
    this.albumsService.getAllEntities$().pipe(
      take(1)
    ).subscribe({
      next: response => {
        this.albums = response
      },
      error: error => console.log(error),
      complete: () => {
        this.filteredAlbumNames = this.albumId.valueChanges.pipe(
          startWith(''),
          map(value => {
            const albumNameInput = typeof value === 'string' ? value : value?.name;
            return albumNameInput ? this.filterAlbumNames(albumNameInput as string) : this.albums.slice();
          }),
        );
      }
    });
  }

  displayAlbumNameByOptionValue(albums: Album[]): (albumId: number) => string {
    return (albumId: number) => {
      const correspondingAlbumOption = Array.isArray(albums) ? albums.find(album => album.id === albumId) : null;
      return correspondingAlbumOption ? correspondingAlbumOption.name : '';
    }
  }

  private filterAlbumNames(albumName: string): Album[] {
    const filteredAlbumNameValue = albumName.toLowerCase();
    return this.albums.filter(album => album.name.toLowerCase().includes(filteredAlbumNameValue));
  }
}