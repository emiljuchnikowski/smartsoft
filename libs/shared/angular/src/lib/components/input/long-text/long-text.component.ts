import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss'],
})
export class InputLongTextComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}

}
