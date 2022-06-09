import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Track } from "../models/track.model";


@Injectable({
  providedIn: 'root'  
})
export class TracksService {
   
  constructor (private httpClient: HttpClient) {

  }  

  getAllTracks$(): Observable<Track[]> {
    const apiUrl = environment.apiUrl + '/tracks';
    const httpParams = new HttpParams({
       fromObject: {
         _expand: 'album'
       } 
    });
    return this.httpClient.get<Track[]>(apiUrl, { params: httpParams});
  }

  getTrackById$(id: number): Observable<Track> {
    const apiUrl = `${environment.apiUrl}/tracks/${id}`;
    const httpParams = new HttpParams({
      fromObject: {
        _expand: 'album'  
      }  	
    });
    return this.httpClient.get<Track>(apiUrl, { params: httpParams });
  }

  createTrack$(track: Track): Observable<Track> {
    const apiUrl = `${environment.apiUrl}/tracks`;
    track.createdOn = new Date();
    track.lastUpdatedOn = new Date();
    return this.httpClient.post<Track>(apiUrl, track);  
  }

  updateTrack$(track: Track): Observable<Track> {
    const apiUrl = `${environment.apiUrl}/tracks/${track.id}`;
    track.lastUpdatedOn = new Date();
    return this.httpClient.put<Track>(apiUrl, track);
  }

  deleteTrack$(id: number): Observable<void> {
    const apiUrl = `${environment.apiUrl}/tracks/${id}`;
    return this.httpClient.delete<void>(apiUrl);  
  }
  
}