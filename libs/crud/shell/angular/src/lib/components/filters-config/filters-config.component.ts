import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {IEntity} from "@smartsoft001/domain-core";

import {ICrudFilter, ICrudFilterQueryItem} from '../../models/interfaces';
import { CrudFacade } from '../../+state/crud.facade';

@Component({
  selector: 'smart-crud-filters-config',
  templateUrl: './filters-config.component.html',
  styleUrls: ['./filters-config.component.scss']
})
export class FiltersConfigComponent<T extends IEntity<string>> implements OnInit {
  filter$: Observable<ICrudFilter>;

  constructor(private readonly facade: CrudFacade<any>) { }

  onRemoveQuery(item: ICrudFilterQueryItem, filter: ICrudFilter): void {
    const index = filter.query.indexOf(item);
    if (index > -1) {
      filter.query.splice(index, 1);
    }
    this.facade.read(filter);
  }

  ngOnInit(): void {
    this.filter$ = this.facade.filter$;
  }
}
