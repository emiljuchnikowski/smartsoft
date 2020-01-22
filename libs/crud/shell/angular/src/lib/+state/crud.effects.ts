import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Action, ActionsSubject, Store} from "@ngrx/store";

import {CrudService} from "../services";
import {IEntity} from "@smartsoft001/domain-core";
import * as CrudActions from './crud.actions';
import {CrudConfig} from "../crud.config";

@Injectable()
export class CrudEffects<T extends IEntity<string>> {
    constructor(
        private actions$: ActionsSubject,
        private service: CrudService<T>,
        private config: CrudConfig<T>,
        private store: Store<any>
    ) { }

    init(): void {
        this.actions$.subscribe((action: Action & any) => {
            switch (action.type) {
                case `[${this.config.entity}] Create`:
                    this.service.create(action.item).pipe(
                        tap(() =>
                            this.store.dispatch(CrudActions.createSuccess(this.config.entity, action.item))
                        ),
                        catchError(error => {
                            this.store.dispatch(CrudActions.createFailure(this.config.entity, action.item, error));
                            return of();
                        })
                    ).subscribe();
                    break;

                case `[${this.config.entity}] Create Success`:
                    this.store.dispatch(CrudActions.read(this.config.entity));
                    break;

                case `[${this.config.entity}] Read`:
                    this.service.getList(action.filter).pipe(
                        tap(result =>
                            this.store.dispatch(CrudActions.readSuccess(this.config.entity, action.filter, result))
                        ),
                        catchError(error => {
                            this.store.dispatch(CrudActions.readFailure(this.config.entity, action.filter, error));
                            return of();
                        })
                    ).subscribe();
                    break;

                case `[${this.config.entity}] Select`:
                    this.service.getById(action.id).pipe(
                        tap(result =>
                            this.store.dispatch(CrudActions.selectSuccess(this.config.entity, action.id, result))
                        ),
                        catchError(error => {
                            this.store.dispatch(CrudActions.selectFailure(this.config.entity, action.id, error));
                            return of();
                        })
                    ).subscribe();
                    break;

                case `[${this.config.entity}] Update`:
                    this.service.updatePartial(action.item).pipe(
                        tap(() =>
                            this.store.dispatch(CrudActions.updateSuccess(this.config.entity, action.item))
                        ),
                        catchError(error => {
                            this.store.dispatch(CrudActions.updateFailure(this.config.entity, action.item, error));
                            this.store.dispatch(CrudActions.read(this.config.entity));
                            return of();
                        })
                    ).subscribe();
                    break;

                case `[${this.config.entity}] Update Success`:
                    this.store.dispatch(CrudActions.read(this.config.entity));
                    break;

                case `[${this.config.entity}] Update partial`:
                    this.service.updatePartial(action.item).pipe(
                        tap(() =>
                            this.store.dispatch(CrudActions.updatePartialSuccess(this.config.entity, action.item))
                        ),
                        catchError(error => {
                            this.store.dispatch(CrudActions.updatePartialFailure(this.config.entity, action.item, error));
                            this.store.dispatch(CrudActions.read(this.config.entity));
                            return of();
                        })
                    ).subscribe();
                    break;

                case `[${this.config.entity}] Update partial Success`:
                    this.store.dispatch(CrudActions.read(this.config.entity));
                    break;

                case `[${this.config.entity}] Delete`:
                    this.service.delete(action.id).pipe(
                        tap(() =>
                            this.store.dispatch(CrudActions.deleteSuccess(this.config.entity, action.id))
                        ),
                        catchError(error => {
                            this.store.dispatch(CrudActions.deleteFailure(this.config.entity, action.id, error));
                            return of();
                        })
                    ).subscribe();
                    break;

                case `[${this.config.entity}] Delete Success`:
                    this.store.dispatch(CrudActions.read(this.config.entity));
                    break;

                default:
                    break;
            }
        });
    }
}
