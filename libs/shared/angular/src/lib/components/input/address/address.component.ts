import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'smart-input-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class InputAddressComponent<T> extends InputBaseComponent<T> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}
}
