import {Input, OnInit} from '@angular/core';
import {IFieldOptions} from "@smartsoft001/models";
import {Observable} from "rxjs";

import {IButtonOptions, IListInternalOptions, IListProvider} from "@smartsoft001/angular";
import {DetailsPage} from "../../../pages/details/details.page";
import { IDetailsOptions } from '../../../models';
import {Router} from "@angular/router";
import {IEntity} from "@smartsoft001/domain-core";

export abstract class ListBaseComponent<T extends IEntity<string>> implements OnInit {
  private _provider: IListProvider<T>;
  private _fields: Array<{ key: string, options: IFieldOptions }>;

  detailsComponent;
  detailsComponentProps: IDetailsOptions<T>;
  select: (id: string) => void;
  unselect: () => void;
  editHandler: (id: string) => void;
  detailsButtonOptions: IButtonOptions;

  keys: Array<string>;
  list$: Observable<T[]>;
  loading$: Observable<boolean>;

  @Input() set options(val: IListInternalOptions<T>) {
    this._fields = val.fields;
    this._provider = val.provider;
    this.initKeys();
    this.initList();
    this.initLoading();

    if (val.edit) {
      if (!val.editOptions)
        throw Error('Must set edit options');

      this.editHandler = id => {
        this.router.navigate([ val.editOptions.routingPrefix, id ]);
      };
    }

    if (val.details) {
      if (!val.detailsProvider)
        throw Error('Must set details provider');

      this.detailsComponent = DetailsPage;
      this.detailsComponentProps = {
        item$: val.detailsProvider.item$,
        type: val.type,
        loading$: val.detailsProvider.loading$,
        editHandler: this.editHandler
      };

      this.select = val.detailsProvider.getData;
      this.unselect = val.detailsProvider.clearData;
    }
  }

  constructor(private router:Router) {
    this.detailsButtonOptions = {
      loading$: this.loading$,
      click: () =>  {
        this.unselect();
      }
    };
  }

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
