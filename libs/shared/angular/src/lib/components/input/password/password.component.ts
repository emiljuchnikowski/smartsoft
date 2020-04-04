import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: "smart-input-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponent<T> extends InputBaseComponent<T> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}
}
