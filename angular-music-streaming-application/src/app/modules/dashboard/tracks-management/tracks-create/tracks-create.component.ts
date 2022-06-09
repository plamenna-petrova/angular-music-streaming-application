import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { Track } from 'src/app/core/models/track.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-tracks-create',
  templateUrl: './tracks-create.component.html',
  styleUrls: ['./tracks-create.component.scss']
})
export class TracksCreateComponent implements OnInit {

  track!: Track;

  albums!: Album[];

  trackCreationForm!: FormGroup

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

    this.tracksService.createTrack$(createTrackRequestBody).pipe(
      take(1)
    ).subscribe((response) => {
      console.log("create new track");
      console.log(response);
      let newTrack = response;
      this.toastr.success(`The track ${newTrack.title} is successfully saved`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  private buildTrackCreationForm() {
    this.track = new Track();
    this.trackCreationForm = this.formBuilder.group({
      title: [this.track.title, [Validators.required]],
      duration: [this.track.duration, [Validators.required]],
      albumId: [this.track.albumId, Validators.required],
      performedLanguage: [this.track.performedLanguage, [Validators.required]],
      isTrending: [this.track.isTrending]
    });
  }

  ngOnInit(): void {
    this.albumsService.getAllAlbums$().pipe(
      take(1)
    ).subscribe((response) => {
      this.albums = response;
    });
  }

}
