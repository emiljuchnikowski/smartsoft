import {EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {IFormOptions} from "../../../models";

export abstract class FormBaseComponent<T> {
  private _fields: Array<string>;
  private _model: any;
  private _form: FormGroup;

  mode: string;

  get fields(): Array<string> {
    return this._fields;
  }

  get model(): any {
      return this._model;
  }

  @Input() set form(val: FormGroup) {
    this._form = val;
    this._fields = Object.keys(this._form.controls);
  }
  get form(): FormGroup {
    return this._form;
  }

  @Input() set options(obj: IFormOptions<T>) {
      this._model = obj.model;
      this.mode = obj.mode;
  }

  @Output() invokeSubmit = new EventEmitter();

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }

}
