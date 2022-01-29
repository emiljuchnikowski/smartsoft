import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {NipService} from "@smartsoft001/utils";
import { Validators } from '@angular/forms';

@Component({
  selector: 'smart-input-phone-number-pl',
  templateUrl: './phone-number-pl.component.html',
  styleUrls: ['./phone-number-pl.component.scss'],
})
export class InputPhoneNumberPlComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}

  afterSetOptionsHandler() {
    const validators = this.control.validator ? [ this.control.validator ] : [];

    validators.push(Validators.minLength(9));
    validators.push(Validators.maxLength(9));

    this.control.setValidators(validators);

    this.control.updateValueAndValidity();
  }
}
