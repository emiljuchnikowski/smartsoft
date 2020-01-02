import {ChangeDetectorRef, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {IFormOptions} from "../../../models";
import {FormFactory} from "../../../factories";
import {getModelFieldKeys} from "@smartsoft001/models";

export abstract class FormBaseComponent<T> {
  private _form: FormGroup;
  private _fields: Array<string>;
  private _model: any;

  get form(): FormGroup {
    return this._form;
  }

  get fields(): Array<string> {
    return this._fields;
  }

  get model(): any {
      return this._model;
  }

  @Input() set options(obj: IFormOptions<T>) {
    this.formFactory.create(obj.model)
        .then(res => {
          this._form = res;
          this._model = obj.model;
          this._fields = getModelFieldKeys(this._model.constructor);
          this.cd.detectChanges();
        });
  }
  @Output() invokeSubmit = new EventEmitter();

  protected constructor(private formFactory: FormFactory, private cd: ChangeDetectorRef) { }

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }

}
