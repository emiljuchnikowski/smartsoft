import { Component, OnInit } from '@angular/core';

import {FormBaseComponent} from "../base/base.component";
import {FormFactory} from "../../../factories";

@Component({
  selector: 'smart-form-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class FormStandardComponent<T> extends FormBaseComponent<T> implements OnInit {

  constructor(ff: FormFactory) {
    super(ff);
  }

  ngOnInit() {
  }

}
