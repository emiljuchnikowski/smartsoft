import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class InputFlagComponent<T> extends InputBaseComponent<T> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit(): void {
  }
}
