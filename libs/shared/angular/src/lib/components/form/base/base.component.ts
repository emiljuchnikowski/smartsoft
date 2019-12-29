import {EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {FormFactory} from "@smartsoft001/angular";

export abstract class FormBaseComponent<T> {
  private _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  @Input() set options(obj: { model: T }) {
    this.formFactory.create(obj.model)
        .then(res => this._form = res);
  }
  @Output() invokeSubmit = new EventEmitter();

  protected constructor(private formFactory: FormFactory) { }

  submit(): void {
    this.invokeSubmit.emit(this.form.value);
  }

}
