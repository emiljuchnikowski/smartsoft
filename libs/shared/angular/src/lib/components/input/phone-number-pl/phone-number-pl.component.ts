import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

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

}
