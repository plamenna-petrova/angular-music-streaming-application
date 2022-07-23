import { Observable } from "rxjs";

export interface ICrudService<TEntity, TID> {
    getAllEntities$(): Observable<TEntity[]>;
    getEntityById$(id: TID): Observable<TEntity>;
    createEntity$(entity: TEntity): Observable<TEntity>;
    updateEntity$(entity: TEntity, id: TID): Observable<TEntity>;
    deleteEntity$(id: TID): Observable<void>;
}