import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {InputOptions} from "../../models";
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
    this.fieldOptions = getModelFieldOptions(this._options.model, this._options.fieldKey);
  }
  get options(): InputOptions<T> {
    return this._options;
  }

  constructor() { }

  ngOnInit() {
  }

}
