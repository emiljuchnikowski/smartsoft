import {Directive, Input, OnInit} from '@angular/core';

import {IFieldOptions} from "@smartsoft001/models";
import {ICrudFilter} from "@smartsoft001/crud-shell-angular";

@Directive()
export class BaseComponent implements OnInit {
  @Input() item: { key: string; options: IFieldOptions };
  @Input() filter: ICrudFilter;

  get value(): any {
    return 'test';
  }

  set value(val: any) {
    console.log(val);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
