import {Input} from '@angular/core';
import { Observable } from 'rxjs';

import {IDetailsOptions} from "../../../models";
import {getModelFieldsWithOptions, IFieldOptions} from "@smartsoft001/models";

export abstract class DetailsBaseComponent<T> {
  private _fields: Array<{ key: string, options: IFieldOptions }>;
  private _type: any;

  get fields(): Array<{ key: string, options: IFieldOptions }> {
    return this._fields;
  }

  get type(): any {
      return this._type;
  }

  item$: Observable<T>;
  loading$: Observable<boolean>;

  @Input() set options(obj: IDetailsOptions<T>) {
      this._type = obj.type;
      this._fields = getModelFieldsWithOptions(new this._type()).filter(f => f.options.details);
      this.item$ = obj.item$;
      this.loading$ = obj.loading$;
  }
}
