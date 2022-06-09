import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Album } from "../models/album.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

    constructor(private httpClient: HttpClient) {

    }

    getAllAlbums$(): Observable<Album[]> {
       const apiUrl = `${environment.apiUrl}/albums`;
       const httpParams = new HttpParams({
           fromObject: {
             _embed: 'tracks'  
           }
       });
       return this.httpClient.get<Album[]>(apiUrl, { params: httpParams });
    }

    getAlbumById$(id: number): Observable<Album> {
       const apiUrl = `${environment.apiUrl}/albums/${id}`;
       return this.httpClient.get<Album>(apiUrl);
    }

    createAlbum$(album: Album): Observable<Album> {
       const apiUrl = `${environment.apiUrl}/albums`;
       album.createdOn = new Date();
       album.lastUpdatedOn = new Date();
       return this.httpClient.post<Album>(apiUrl, album);
    }

    updateAlbum$(album: Album): Observable<Album> {
       const apiUrl = `${environment.apiUrl}/albums/${album.id}`;
       album.lastUpdatedOn = new Date();
       return this.httpClient.put<Album>(apiUrl, album);
    }

    delete$(id: number): Observable<void> {
        const apiUrl = `${environment.apiUrl}/albums/${id}`;
        return this.httpClient.delete<void>(apiUrl);
    }
}