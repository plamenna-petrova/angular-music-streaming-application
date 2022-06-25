import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


export interface ICrudService<T, ID> {
    getAllEntities$(embeddedEntities: string | null, expandedEntity: string | null): Observable<T[]>;
    getEntityById$(id: ID, embeddedEntities?: string, expandedEntity?: string): Observable<T>;
    createEntity$(entity: T): Observable<T>;
    updateEntity$(entity: T, id: ID): Observable<T>;
    deleteEntity$(id: ID): Observable<void>;
}