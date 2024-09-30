import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
import { Album } from 'src/app/core/models/album.model';
import { Track } from 'src/app/core/models/track.model';
import { TracksService } from 'src/app/core/services/tracks.service';

@Component({
  selector: 'app-tracks-delete',
  templateUrl: './track-delete.component.html',
  styleUrls: ['./track-delete.component.scss']
})
export class TrackDeleteComponent implements OnInit {
  id!: number;
  trackToDelete!: Track;
  albums!: Album[]

  constructor(
    private tracksService: TracksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  deleteTrack(): void {
    this.tracksService.deleteEntity$(this.trackToDelete.id).pipe(
      take(1)
    ).subscribe(() => {
      this.toastr.success(`The Track ${this.trackToDelete.title} from the album ${this.trackToDelete.album.name} by ${this.trackToDelete.album.performer} is successfully deleted.`, `Success`);
      this.router.navigate(['/dashboard', { outlets: { dashboard: ['tracks-management'] } }]);
    });
  }

  ngOnInit(): void {
    this.tracksService.getEntityById$(this.id).pipe(
      take(1),
      tap((data) => { console.log('[Tap] Data', data); })
    ).subscribe({
      next: (response) => {
        this.trackToDelete = response;
      }, error: (error) => {
        console.log(error);
      }, complete: () => {
        console.info('info');
      }
    });
  }
}