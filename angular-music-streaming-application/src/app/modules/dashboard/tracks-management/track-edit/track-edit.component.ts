import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  id: any;
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
      this.trackUpdateForm.markAllAsTouched();
      return;
    }

    const createTrackRequestBody: Track = {
      ...this.trackToUpdate,
      ...this.trackUpdateForm.value
    }

    this.tracksService.updateTrack$(createTrackRequestBody).pipe(
      take(1)
    ).subscribe((response) => {
      let editedTrack = response;
      this.toastr.success(`The track ${editedTrack.title} is successfully edited.`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  private buildTrackUpdateForm(track: Track) {
    this.trackUpdateForm = this.formBuilder.group({
      title: [track.title, [Validators.required]],
      duration: [track.duration, [Validators.required]],
      albumId: [track.albumId, Validators.required],
      performedLanguage: [track.performedLanguage, [Validators.required]],
      isTrending: [track.isTrending]
    });
  }

  ngOnInit(): void {
    this.tracksService.getTrackById$(this.id).pipe(
      take(1)
    ).subscribe((response) => {
      this.trackToUpdate = response;
      this.buildTrackUpdateForm(this.trackToUpdate);
    });

    this.albumsService.getAllAlbums$().pipe(
      take(1)
    ).subscribe((response) => {
      this.albums = response;
    });
  }

  ngAfterInit(): void {

  }

}
