import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class InputRadioComponent<T> extends InputBaseComponent<T> implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}

}
