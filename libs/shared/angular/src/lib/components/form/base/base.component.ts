import {Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {FormFactory} from "@smartsoft001/angular";

export abstract class FormBaseComponent<T> implements OnInit {
  private _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  @Input() set model(obj: T) {
    this.formFactory.create(obj)
        .then(res => this._form = res);
  }

  protected constructor(private formFactory: FormFactory) { }

  ngOnInit() {
  }

}
