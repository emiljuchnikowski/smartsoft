import { Component } from '@angular/core';
import * as moment from "moment";

import {IEntity} from "@smartsoft001/domain-core";

import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-crud-filter-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class FilterDateComponent<T extends IEntity<string>> extends BaseComponent<T> {
  set customValue(val) {
    const momentDate = moment(val);
    this.value = (val as string)?.length >= 10 && momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : val;
  }

  get customValue(): any {
    return this.value;
  }
}
