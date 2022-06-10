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

  trackToCreate!: Track;

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
      let newTrack = response;
      this.toastr.success(`The track ${newTrack.title} from the album ${newTrack.album.name} by ${newTrack.album.performer} is successfully created.`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  private buildTrackCreationForm() {
    this.trackToCreate = new Track();
    this.trackCreationForm = this.formBuilder.group({
      title: [this.trackToCreate.title, [Validators.required]],
      duration: [this.trackToCreate.duration, [Validators.required]],
      albumId: [this.trackToCreate.albumId, Validators.required],
      performedLanguage: [this.trackToCreate.performedLanguage, [Validators.required]],
      isTrending: [this.trackToCreate.isTrending]
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
