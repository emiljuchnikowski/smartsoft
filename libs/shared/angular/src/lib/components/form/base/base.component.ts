import {EventEmitter, Input, Output, Directive, Type, ChangeDetectorRef} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

import {IFormOptions} from "../../../models";
import {InputBaseComponent} from "../../input/base/base.component";
import {delay} from "rxjs/operators";

@Directive()
export abstract class FormBaseComponent<T> {
  private _fields: Array<string>;
  private _subscription: Subscription;
  private _model: any;
  private _form: FormGroup;
  private _possibilities: {
    [key: string]: Observable<{ id: any, text: string }[]>;
  };
  private _inputComponents: { [key: string]: Type<InputBaseComponent<T>>; };

  mode: string;
  treeLevel: number;

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
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._subscription = new Subscription();

    this._form = val;
    this._fields = Object.keys(this._form.controls);

    this._subscription.add(this._form.valueChanges.pipe(
        delay(0)
    ).subscribe(() => {
      this.cd.detectChanges();
    }));

    this.afterSetForm();
  }
  get form(): FormGroup {
    return this._form;
  }

  @Input() set options(obj: IFormOptions<T>) {
      this._model = obj.model;
      this.mode = obj.mode;
      this._possibilities = obj.possibilities ? obj.possibilities : {};
      this._inputComponents = obj.inputComponents ? obj.inputComponents : {};

      this.treeLevel = obj.treeLevel;

      this.afterSetOptions();
  }

  @Output() invokeSubmit = new EventEmitter();

  constructor(protected cd: ChangeDetectorRef) { }

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }

  protected afterSetOptions(): void { }

  protected afterSetForm(): void { }
}
