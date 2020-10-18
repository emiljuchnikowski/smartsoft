import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'smart-input-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class InputColorComponent<T> extends InputBaseComponent<T> implements OnInit {
  color: string;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  protected afterSetOptionsHandler() {
    super.afterSetOptionsHandler();

    this.color = this.control.value;
  }

  selectColor(color: string) {
    this.control.setValue(color);
    this.control.markAllAsTouched();
  }

  clear() {
    this.color = null
    this.control.setValue(null);
    this.control.markAllAsTouched();
  }

  ngOnInit() {}
}
