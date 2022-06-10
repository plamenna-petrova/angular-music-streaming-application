import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Track } from 'src/app/core/models/track.model';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-tracks-delete',
  templateUrl: './track-delete.component.html',
  styleUrls: ['./track-delete.component.scss']
})
export class TrackDeleteComponent implements OnInit {

  id: any;
  trackToDelete!: Track;

  constructor(
    private tracksService: TracksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  deleteTrack(): void {
    this.tracksService.deleteTrack$(this.trackToDelete.id).pipe(
      take(1)
    ).subscribe(() => {
      this.toastr.success(`The Track ${this.trackToDelete.title} from the album ${this.trackToDelete.album.name} by ${this.trackToDelete.album.performer} is successfully deleted.`, `Success`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  ngOnInit(): void {
    this.tracksService.getTrackById$(this.id).pipe(
      take(1)
    ).subscribe((response) => {
      this.trackToDelete = response;
    });
  }

}
