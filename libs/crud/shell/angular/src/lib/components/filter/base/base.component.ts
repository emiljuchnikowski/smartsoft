import {Directive, Input, OnInit} from '@angular/core';
import {Debounce} from "lodash-decorators";

import {IEntity} from "@smartsoft001/domain-core";
import {IModelFilter} from "@smartsoft001/models";

import {ICrudFilter} from "../../../models/interfaces";
import  {CrudFacade} from "../../../+state/crud.facade";

@Directive()
export class BaseComponent<T extends IEntity<string>> implements OnInit {
  @Input() item: IModelFilter;
  @Input() filter: ICrudFilter;

  get value(): any {
    const query = this.filter.query.find(q => q.key === this.item.key && q.type === this.item.type);
    return query?.value;
  }

  set value(val: any) {
    this.refresh(val);
  }

  constructor(private facade: CrudFacade<T>) { }

  ngOnInit(): void {
  }

  @Debounce(500)
  private refresh(val: any) {
    let query = this.filter.query.find(q => q.key === this.item.key && q.type === this.item.type);

    if (!val) {
      const index = this.filter.query.indexOf(query);
      if (index > -1) {
        this.filter.query.splice(index, 1);
      }

      this.facade.read(this.filter);
      return;
    }

    if (!query) {
      query = {
        key: this.item.key,
        type: this.item.type,
        value: null
      };

      this.filter.query.push(query);
    }

    query.value = val;
    query.label = this.item.label;

    this.facade.read(this.filter);
  }
}
