import {Input, OnInit} from '@angular/core';
import {IFieldOptions} from "@smartsoft001/models";
import {Observable} from "rxjs";

import {IListInternalOptions, IListProvider} from "@smartsoft001/angular";
import {DetailsPage} from "../../../pages/details/details.page";

export abstract class ListBaseComponent<T> implements OnInit {
  private _provider: IListProvider<T>;
  private _fields: Array<{ key: string, options: IFieldOptions }>;

  detailsComponent;

  keys: Array<string>;
  list$: Observable<T[]>;

  @Input() set options(val: IListInternalOptions<T>) {
    this._fields = val.fields;
    this._provider = val.provider;
    this.initKeys();
    this.initList();

    if (val.details) {
      this.detailsComponent = DetailsPage;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  protected initKeys(): void {
    this.keys = this._fields.map(field => field.key);
  }

  protected initList(): void {
    this.list$ = this._provider.list$;
  }
}
