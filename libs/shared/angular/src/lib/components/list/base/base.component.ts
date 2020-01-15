import {Input, OnInit} from '@angular/core';
import {IFieldOptions} from "@smartsoft001/models";
import {Observable} from "rxjs";

import {IListInternalOptions, IListProvider} from "@smartsoft001/angular";
import {DetailsPage} from "../../../pages/details/details.page";
import { IDetailsOptions } from '../../../models';

export abstract class ListBaseComponent<T> implements OnInit {
  private _provider: IListProvider<T>;
  private _fields: Array<{ key: string, options: IFieldOptions }>;

  detailsComponent;
  detailsComponentProps: IDetailsOptions<T>;
  select: (id: string) => void;
  unselect: () => void;

  keys: Array<string>;
  list$: Observable<T[]>;
  loading$: Observable<boolean>;

  @Input() set options(val: IListInternalOptions<T>) {
    this._fields = val.fields;
    this._provider = val.provider;
    this.initKeys();
    this.initList();
    this.initLoading();

    if (val.details) {
      if (!val.detailsProvider)
        throw Error('Must set details provider');

      this.detailsComponent = DetailsPage;
      this.detailsComponentProps = {
        item$: val.detailsProvider.item$,
        type: val.type,
        loading$: val.detailsProvider.loading$
      };

      this.select = val.detailsProvider.getData;
      this.unselect = val.detailsProvider.clearData;
    }
  }

  constructor() { }

  protected initKeys(): void {
    this.keys = this._fields.map(field => field.key);
  }

  protected initList(): void {
    this.list$ = this._provider.list$;
  }

  protected initLoading(): void {
    this.loading$ = this._provider.loading$;
  }

  ngOnInit() {
  }
}
