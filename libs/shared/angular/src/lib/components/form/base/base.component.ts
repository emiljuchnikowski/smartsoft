import {EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {IFormOptions} from "../../../models";
import {getModelFieldKeys} from "@smartsoft001/models";

export abstract class FormBaseComponent<T> {
  private _fields: Array<string>;
  private _model: any;

  get fields(): Array<string> {
    return this._fields;
  }

  get model(): any {
      return this._model;
  }

  @Input() form: FormGroup;
  @Input() set options(obj: IFormOptions<T>) {
      this._model = obj.model;
      this._fields = getModelFieldKeys(this._model.constructor);
  }
  @Output() invokeSubmit = new EventEmitter();

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }

}
