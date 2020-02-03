import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class InputEmailComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}

}
