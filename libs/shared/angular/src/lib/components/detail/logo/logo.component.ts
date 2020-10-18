import { Component } from '@angular/core';

import {DetailBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-detail-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class DetailLogoComponent<T> extends DetailBaseComponent<T> {

}
