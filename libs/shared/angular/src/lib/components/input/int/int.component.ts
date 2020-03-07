import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-int',
  templateUrl: './int.component.html',
  styleUrls: ['./int.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputIntComponent<T> extends InputBaseComponent<T> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
  ngOnInit() {
  }

}
