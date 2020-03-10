import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { CrudConfig } from "../crud.config";
import * as CrudActions from "./crud.actions";
import * as CrudSelectors from "./crud.selectors";
import { IEntity } from "@smartsoft001/domain-core";
import { ICrudFilter } from "../models/interfaces";
import { map, tap } from "rxjs/operators";

@Injectable()
export class CrudFacade<T extends IEntity<string>> {
  selected: T;
  list: Array<T>;
  filter: ICrudFilter;

  loaded$: Observable<boolean> = this.store.pipe(
    select(CrudSelectors.getCrudLoaded(this.config.entity))
  );
  loading$: Observable<boolean> = this.store.pipe(
    select(CrudSelectors.getCrudLoaded(this.config.entity)),
    map(l => !l)
  );
  selected$: Observable<T> = this.store.pipe(
    select(CrudSelectors.getCrudSelected(this.config.entity)),
    tap(s => {
      this.selected = s;
    })
  );
  list$: Observable<T[]> = this.store.pipe(
    select(CrudSelectors.getCrudList(this.config.entity)),
    tap(l => {
      this.list = l;
    })
  );
  filter$: Observable<ICrudFilter> = this.store.pipe(
    select(CrudSelectors.getCrudFilter(this.config.entity)),
    tap(f => {
      this.filter = f;
    })
  );
  totalCount$: Observable<number> = this.store.pipe(
    select(CrudSelectors.getCrudTotalCount(this.config.entity))
  );
  links$: Observable<any> = this.store.pipe(
    select(CrudSelectors.getCrudLinks(this.config.entity))
  );

  constructor(private store: Store<any>, private config: CrudConfig<T>) {}

  create(item: T): void {
    this.store.dispatch(CrudActions.create(this.config.entity, item));
  }

  read(filter: ICrudFilter = null): void {
    this.store.dispatch(CrudActions.read(this.config.entity, filter));
  }

  select(id: string): void {
    this.store.dispatch(CrudActions.select(this.config.entity, id));
  }

  unselect(): void {
    this.store.dispatch(CrudActions.unselect(this.config.entity));
  }

  update(item: T): void {
    this.store.dispatch(CrudActions.update(this.config.entity, item));
  }

  export(filter: ICrudFilter = null): void {
    this.store.dispatch(CrudActions.exportList(this.config.entity, filter));
  }

  updatePartial(item: Partial<T> & { id: string }): void {
    this.store.dispatch(CrudActions.updatePartial(this.config.entity, item));
  }

  delete(id: string): void {
    this.store.dispatch(CrudActions.deleteItem(this.config.entity, id));
  }
}
