import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-float',
  templateUrl: './float.component.html',
  styleUrls: ['./float.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFloatComponent<T> extends InputBaseComponent<T> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
  ngOnInit() {
  }

}
