import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { ICrudService } from "../interfaces/ICrudService.interface";

@Injectable({
    providedIn: 'root'
})
export abstract class CrudService<T, ID> implements ICrudService<T, ID> {

    constructor(
        protected httpClient: HttpClient,
        @Inject(String) protected baseApiUrl: string) {

    }

    getAllEntities$(embeddedEntities: string | null, expandedEntity: string | null): Observable<T[]> {
        const getAllEntitiesApiUrl = `${this.baseApiUrl}`;

        let fromObject: { [key: string]: string } = {};

        if (embeddedEntities !== null) {
            fromObject["_embed"] = `${embeddedEntities}`;
        }

        if (expandedEntity !== null) {
            fromObject["_expand"] = `${expandedEntity}`;
        }

        const httpParams = new HttpParams({
            fromObject: fromObject
        });

        return this.httpClient.get<T[]>(getAllEntitiesApiUrl, { params: httpParams });
    }

    getEntityById$(id: ID, embeddedEntities?: string, expandedEntity?: string): Observable<T> {
        const getEntityByIdApiUrl = `${this.baseApiUrl}/${id}`;

        let fromObject: { [key: string]: string } = {};

        if (embeddedEntities !== undefined) {
            fromObject["_embed"] = `${embeddedEntities}`;
        }

        if (expandedEntity !== undefined) {
            fromObject["_expand"] = `${expandedEntity}`;
        }

        const httpParams = new HttpParams({
            fromObject: fromObject
        });

        return this.httpClient.get<T>(getEntityByIdApiUrl, { params: httpParams });
    }

    createEntity$(entity: T): Observable<T> {
        const createEntityApiUrl = `${this.baseApiUrl}`;
        return this.httpClient.post<T>(createEntityApiUrl, entity);
    }

    updateEntity$(entity: T, id: ID): Observable<T> {
        const updateEntityApiUrl = `${this.baseApiUrl}/${id}`;
        return this.httpClient.put<T>(updateEntityApiUrl, entity);
    }

    deleteEntity$(id: ID): Observable<void> {
        const deleteEntityApiUrl = `${this.baseApiUrl}/${id}`;
        return this.httpClient.delete<void>(deleteEntityApiUrl);
    }

}