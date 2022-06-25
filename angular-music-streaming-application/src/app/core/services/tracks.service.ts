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
   
  constructor (protected override httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/tracks`);
  }  
  
}