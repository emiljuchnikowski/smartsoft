import {EventEmitter, Input, Output, Directive, Type} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

import {IFormOptions} from "../../../models";
import {InputBaseComponent} from "@smartsoft001/angular";

@Directive()
export abstract class FormBaseComponent<T> {
  private _fields: Array<string>;
  private _model: any;
  private _form: FormGroup;
  private _possibilities: {
    [key: string]: Observable<{ id: any, text: string }[]>;
  };
  private _inputComponents: { [key: string]: Type<InputBaseComponent<T>>; };

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

  get inputComponents(): { [key: string]: Type<InputBaseComponent<T>>; } {
    return this._inputComponents;
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
      this._inputComponents = obj.inputComponents ? obj.inputComponents : {};
  }

  @Output() invokeSubmit = new EventEmitter();

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }
}
