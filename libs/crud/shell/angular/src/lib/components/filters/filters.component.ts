import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {MenuService} from "@smartsoft001/angular";
import {getModelFieldsWithOptions, IFieldOptions} from "@smartsoft001/models";
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
  list: Array<{ key:string, options: IFieldOptions }>;

  filter$: Observable<ICrudFilter>;

  constructor(
      private menuService: MenuService, private config: CrudConfig<T>, private facade: CrudFacade<T>
  ) { }

  async onClose(): Promise<void> {
    await this.menuService.closeEnd();
  }

  ngOnInit(): void {
    this.list = getModelFieldsWithOptions(new this.config.type());
    this.filter$ = this.facade.filter$;
  }
}
