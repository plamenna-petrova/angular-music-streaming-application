import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { ICrudService } from "../interfaces/ICrudService.interface";

@Injectable({
    providedIn: 'root'
})
export abstract class CrudService<TEntity, TID> implements ICrudService<TEntity, TID> {

    constructor(
        protected httpClient: HttpClient,
        @Inject(String) protected baseApiUrl: string) {

    }

    getAllEntities$(): Observable<TEntity[]> {
        const getAllEntitiesApiUrl = `${this.baseApiUrl}`;
        return this.httpClient.get<TEntity[]>(getAllEntitiesApiUrl);
    }

    getEntityById$(id: TID): Observable<TEntity> {
        const getEntityByIdApiUrl = `${this.baseApiUrl}/${id}`;
        return this.httpClient.get<TEntity>(getEntityByIdApiUrl);
    }

    createEntity$(entity: TEntity): Observable<TEntity> {
        const createEntityApiUrl = `${this.baseApiUrl}`;
        return this.httpClient.post<TEntity>(createEntityApiUrl, entity);
    }

    updateEntity$(entity: TEntity, id: TID): Observable<TEntity> {
        const updateEntityApiUrl = `${this.baseApiUrl}/${id}`;
        return this.httpClient.put<TEntity>(updateEntityApiUrl, entity);
    }

    deleteEntity$(id: TID): Observable<void> {
        const deleteEntityApiUrl = `${this.baseApiUrl}/${id}`;
        return this.httpClient.delete<void>(deleteEntityApiUrl);
    }

}