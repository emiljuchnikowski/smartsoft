import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {MenuService} from "@smartsoft001/angular";
import {getModelFieldsWithOptions, getModelOptions, IFieldListMetadata, IModelFilter} from "@smartsoft001/models";
import {IEntity} from "@smartsoft001/domain-core";

import {ICrudFilter} from "../../models/interfaces";
import {CrudConfig} from "../../crud.config";
import {CrudFacade} from "../../+state/crud.facade";

@Component({
  selector: 'smart-crud-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent<T extends IEntity<string>> implements OnInit {
  list: Array<IModelFilter>;

  filter$: Observable<ICrudFilter>;

  constructor(
      private menuService: MenuService, private config: CrudConfig<T>, private facade: CrudFacade<T>
  ) { }

  async onClose(): Promise<void> {
    await this.menuService.closeEnd();
  }

  ngOnInit(): void {
    const modelFilters = getModelOptions(this.config.type).filters;

    this.list = [
        ...(modelFilters ? modelFilters.map(item => {
          if (!item.label) {
            item.label = 'MODEL.' + item.key;
          }
          return item;
        }) : []),
        ...getModelFieldsWithOptions(new this.config.type())
            .filter(item => (item.options?.list as IFieldListMetadata)?.filter)
            .map(item => ({
              key: item.key,
              type: '=' as '=',
              label: 'MODEL.' + item.key,
              fieldType: item.options.type
            }))
    ];
    this.filter$ = this.facade.filter$;
  }
}
