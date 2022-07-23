import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Track } from "../models/track.model";
import { CrudService } from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class TracksService extends CrudService<Track, number> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/tracks`);
  }

  override getAllEntities$(): Observable<Track[]> {
    const getAllTracksApiUrl = `${environment.apiUrl}/tracks`;
    const httpParams = new HttpParams({
      fromObject: {
        _expand: 'album'
      }
    });
    return this.httpClient.get<Track[]>(getAllTracksApiUrl, { params: httpParams });
  }

  override getEntityById$(id: number): Observable<Track> {
    const getTrackByIdApiUrl = `${environment.apiUrl}/tracks/${id}`;
    const httpParams = new HttpParams({
      fromObject: {
        _expand: 'album'
      }
    });
    return this.httpClient.get<Track>(getTrackByIdApiUrl, { params: httpParams });
  }

}