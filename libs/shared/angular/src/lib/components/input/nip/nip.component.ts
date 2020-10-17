import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {NipService} from "@smartsoft001/utils";

@Component({
  selector: 'smart-input-nip',
  templateUrl: './nip.component.html',
  styleUrls: ['./nip.component.scss'],
})
export class InputNipComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {

  }

  afterSetOptionsHandler() {
    const validators = this.control.validator ? [ this.control.validator ] : [];

    validators.push(c => {
      if (c.value && NipService.isInvalid(c.value)) {
        return {
          invalidNip: true
        }
      }

      return null;
    })

    this.control.setValidators(validators);

    this.control.updateValueAndValidity();
  }
}
