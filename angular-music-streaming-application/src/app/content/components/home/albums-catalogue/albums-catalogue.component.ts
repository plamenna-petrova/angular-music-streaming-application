import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/core/models/album.model';
import { AlbumsService } from 'src/app/core/services/albums.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-albums-catalogue',
  templateUrl: './albums-catalogue.component.html',
  styleUrls: ['./albums-catalogue.component.scss']
})
export class AlbumsCatalogueComponent implements OnInit {

  albumsForCatalogue!: Album[];
  albumsTopCatalogueResults!: Album[];
  albumsBottomCatalogueResults!: Album[];

  constructor(private albumsService: AlbumsService) {

  }

  ngOnInit(): void {
    this.albumsService.getAllAlbums$().pipe(
      take(1)
    ).subscribe((response) => {
      this.albumsForCatalogue = response;
      this.albumsTopCatalogueResults = this.albumsForCatalogue.slice(0, 4);
      this.albumsBottomCatalogueResults = this.albumsForCatalogue.slice(4, 8);
    });
  }

}
