import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class InputCurrencyComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}

}
