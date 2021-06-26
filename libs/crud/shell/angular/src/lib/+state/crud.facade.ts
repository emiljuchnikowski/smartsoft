import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import * as _ from "lodash";

import { IEntity } from "@smartsoft001/domain-core";

import { CrudConfig } from "../crud.config";
import * as CrudActions from "./crud.actions";
import * as CrudSelectors from "./crud.selectors";
import {ICrudCreateManyOptions, ICrudFilter} from "../models/interfaces";
import {NgrxStoreService} from "@smartsoft001/angular";


@Injectable()
export class CrudFacade<T extends IEntity<string>> {
  selected: T;
  multiSelected: T;
  list: Array<T>;
  filter: ICrudFilter;

  get loaded$(): Observable<boolean> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudLoaded(this.config.entity))
    );
  }

  get loading$(): Observable<boolean> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudLoaded(this.config.entity)),
        map(l => !l)
    );
  }

  get selected$(): Observable<T>  {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudSelected(this.config.entity)),
        tap(s => {
          this.selected = s;
        })
    );
  }

  get multiSelected$(): Observable<T[]> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudMultiSelected(this.config.entity)),
        tap(s => {
          this.multiSelected = s;
        })
    );
  }

  get list$(): Observable<T[]> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudList(this.config.entity)),
        tap(l => {
          this.list = l;
        })
    );
  }

  get filter$(): Observable<ICrudFilter> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudFilter(this.config.entity)),
        tap(f => {
          this.filter = f;
        })
    );
  }

  get totalCount$(): Observable<number> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudTotalCount(this.config.entity))
    );
  }

  get links$(): Observable<any> {
    return this.getStore().pipe(
        select(CrudSelectors.getCrudLinks(this.config.entity))
    );
  }

  get error$(): Observable<any> {
    return  this.getStore().pipe(
        select(CrudSelectors.getCrudError(this.config.entity))
    );
  }

  constructor(private readonly store: Store<any>, private config: CrudConfig<T>) {
    if (NgrxStoreService.store) {
      this.store = NgrxStoreService.store;
    }
  }

  create(item: T): void {
    this.getStore().dispatch(CrudActions.create(this.config.entity, item));
  }

  createMany(items: Array<T>, options: ICrudCreateManyOptions): void {
    this.getStore().dispatch(CrudActions.createMany(this.config.entity, { items, options }));
  }

  read(filter: ICrudFilter = null): void {
    let baseQuery = [];
    if (this.config.baseQuery) {
      baseQuery = this.config.baseQuery;
    }

    const fullFilter = {
      ...(filter ? filter : {}),
      query: filter && filter.query ? filter.query : baseQuery
    };

    this.getStore().dispatch(CrudActions.read(this.config.entity, fullFilter));
  }

  select(id: string): void {
    this.getStore().dispatch(CrudActions.select(this.config.entity, id));
  }

  unselect(): void {
    this.getStore().dispatch(CrudActions.unselect(this.config.entity));
  }

  multiSelect(items: Array<T>): void {
    this.getStore().dispatch(CrudActions.multiSelect(this.config.entity, items));
  }

  update(item: T): void {
    this.getStore().dispatch(CrudActions.update(this.config.entity, item));
  }

  export(filter: ICrudFilter = null, format = null): void {
    this.getStore().dispatch(CrudActions.exportList(this.config.entity, filter, format));
  }

  updatePartial(item: Partial<T> & { id: string }): void {
    this.getStore().dispatch(CrudActions.updatePartial(this.config.entity, item));
  }

  updatePartialMany(items: (Partial<T> & {id: string})[]) {
    this.getStore().dispatch(CrudActions.updatePartialMany(this.config.entity, items));
  }

  delete(id: string): void {
    this.getStore().dispatch(CrudActions.deleteItem(this.config.entity, id));
  }

  private getStore(): Store {
    if (NgrxStoreService.store) return NgrxStoreService.store;

    return this.store;
  }
}
