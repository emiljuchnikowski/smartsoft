import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {InputOptions} from "../../models/interfaces";
import {FieldType, getModelFieldOptions, IFieldOptions} from "@smartsoft001/models";

@Component({
  selector: 'smart-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> implements OnInit {

  private _options: InputOptions<T>;

  fieldOptions: IFieldOptions;
  FieldType = FieldType;

  @Input() set options(val: InputOptions<T>) {
    this._options = val;
    let key = this._options.fieldKey;

    if (key && key.endsWith('Confirm')) {
      key = key.replace('Confirm', '');
    }

    let fieldOptions = getModelFieldOptions(this._options.model, key);

    if (val.mode === 'create' && _.isObject(fieldOptions.create)) {
      fieldOptions = {
        ...fieldOptions,
        ...(fieldOptions.create as IFieldOptions)
      };
    } else if (val.mode === 'update' && _.isObject(fieldOptions.update)) {
      fieldOptions = {
        ...fieldOptions,
        ...(fieldOptions.update as IFieldOptions)
      };
    }

    this.fieldOptions = fieldOptions;
  }
  get options(): InputOptions<T> {
    return this._options;
  }

  constructor() { }

  ngOnInit() {
  }

}
