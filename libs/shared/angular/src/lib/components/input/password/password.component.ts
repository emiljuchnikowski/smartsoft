import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: "smart-input-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponent<T> extends InputBaseComponent<T> implements OnInit {
  valid = true;
  focus = false;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    this.control.setValidators([
        this.control.validator,
      (c) => {
        if (!this.valid) {
          return {
            passwordStrength: true
          };
        }

        return null;
      }
    ])
  }

  onChangePasswordStrength(valid: boolean) {
    this.valid = valid;
    this.control.updateValueAndValidity();
  }
}
