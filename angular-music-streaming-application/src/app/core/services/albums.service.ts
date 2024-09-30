import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Album } from "../models/album.model";
import { CrudService } from "./crud.service";

@Injectable({
   providedIn: 'root'
})
export class AlbumsService extends CrudService<Album, number> {
   constructor(protected override httpClient: HttpClient) {
      super(httpClient, `${environment.apiUrl}/albums`);
   }

   override getAllEntities$(): Observable<Album[]> {
      const getAllAlbumsApiUrl = `${environment.apiUrl}/albums`;

      const httpParams = new HttpParams({
         fromObject: {
            _embed: 'tracks'
         }
      });

      return this.httpClient.get<Album[]>(getAllAlbumsApiUrl, { params: httpParams });
   }
}