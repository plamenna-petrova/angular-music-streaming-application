import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
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

  trackUpdateForm!: FormGroup

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

    const createTrackRequestBody: Track = {
      ...this.trackToUpdate,
      ...this.trackUpdateForm.value
    }

    createTrackRequestBody.lastUpdatedOn = new Date();

    this.tracksService.updateEntity$(createTrackRequestBody, createTrackRequestBody.id).pipe(
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
      albumId: [track.albumId, Validators.required],
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

  get albumId(): AbstractControl {
    return this.trackUpdateForm.get('albumId')!;
  }

  get performedLanguage(): AbstractControl {
    return this.trackUpdateForm.get('performedLanguage')!;
  }

  get isTrending(): AbstractControl {
    return this.trackUpdateForm.get('isTrending')!;
  }

  ngOnInit(): void {
    this.tracksService.getEntityById$(this.id, undefined, 'album').pipe(
      take(1)
    ).subscribe((response) => {
      this.trackToUpdate = response;
      this.buildTrackUpdateForm(this.trackToUpdate);
    });

    this.albumsService.getAllEntities$('tracks', null).pipe(
      take(1)
    ).subscribe((response) => {
      this.albums = response;
    });
  }

  ngAfterInit(): void {

  }

}
