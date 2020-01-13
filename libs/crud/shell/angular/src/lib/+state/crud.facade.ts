import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {Injectable} from "@angular/core";

import { CrudConfig } from "../crud.config";
import * as CrudActions from "./crud.actions";
import * as CrudSelectors from "./crud.selectors";
import { IEntity } from "@smartsoft001/domain-core";

@Injectable()
export class CrudFacade<T extends IEntity<string>> {
  loaded$: Observable<boolean> = this.store.pipe(
    select(CrudSelectors.getCrudLoaded(this.config.entity))
  );
  selected$: Observable<T> = this.store.pipe(
    select(CrudSelectors.getCrudSelected(this.config.entity))
  );
  list$: Observable<T[]> = this.store.pipe(
    select(CrudSelectors.getCrudList(this.config.entity))
  );
  totalCount$: Observable<number> = this.store.pipe(
    select(CrudSelectors.getCrudTotalCount(this.config.entity))
  );
  links$: Observable<any> = this.store.pipe(
    select(CrudSelectors.getCrudLinks(this.config.entity))
  );

  constructor(private store: Store<any>, private config: CrudConfig) {}

  create(item: T): void {
    this.store.dispatch(CrudActions.create(this.config.entity, item));
  }

  read<F>(filter: F = null): void {
    this.store.dispatch(CrudActions.read(this.config.entity, filter));
  }

  select(id: string): void {
    this.store.dispatch(CrudActions.select(this.config.entity, id));
  }

  update(item: T): void {
    this.store.dispatch(CrudActions.update(this.config.entity, item));
  }

  updatePartial(item: Partial<T> & { id: string }): void {
    this.store.dispatch(CrudActions.updatePartial(this.config.entity, item));
  }

  delete(id: string): void {
    this.store.dispatch(CrudActions.deleteItem(this.config.entity, id));
  }
}
