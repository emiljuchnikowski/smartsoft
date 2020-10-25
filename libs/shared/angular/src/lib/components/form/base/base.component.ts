import { EventEmitter, Input, Output, Directive } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

import {IFormOptions} from "../../../models";

@Directive()
export abstract class FormBaseComponent<T> {
  private _fields: Array<string>;
  private _model: any;
  private _form: FormGroup;
  private _possibilities: {
    [key: string]: Observable<{ id: any, text: string }[]>;
  };

  mode: string;

  get fields(): Array<string> {
    return this._fields;
  }

  get model(): any {
      return this._model;
  }

  get possibilities(): {
    [key: string]: Observable<{ id: any, text: string }[]>;
  } {
    return this._possibilities;
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
      this._possibilities = obj.possibilities ? obj.possibilities : {};
  }

  @Output() invokeSubmit = new EventEmitter();

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }
}
