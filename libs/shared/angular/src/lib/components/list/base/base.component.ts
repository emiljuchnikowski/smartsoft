import {Input, OnInit} from '@angular/core';
import {IFieldOptions} from "@smartsoft001/models";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {IEntity} from "@smartsoft001/domain-core";

import {DetailsPage} from "../../../pages/details/details.page";
import { IDetailsOptions, IListProvider, IButtonOptions } from '../../../models/interfaces';
import { IListInternalOptions } from '../list.component';

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
      if (!val.edit['options'])
        throw Error('Must set edit options');

      this.editHandler = id => {
        this.router.navigate([ val.edit['options'].routingPrefix, id ]);
      };
    }

    if (val.details) {
      if (!val.details['provider'])
        throw Error('Must set details provider');

      this.detailsComponent = DetailsPage;
      this.detailsComponentProps = {
        item$: val.details['provider'].item$,
        type: val.type,
        loading$: val.details['provider'].loading$,
        editHandler: this.editHandler,
        componentFactories: val.details['componentFactories']
      };

      this.select = val.details['provider'].getData;
      this.unselect = val.details['provider'].clearData;
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
