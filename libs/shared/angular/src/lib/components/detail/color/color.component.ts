import { Component } from '@angular/core';

import {DetailBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-detail-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class DetailColorComponent<T> extends DetailBaseComponent<T> {

}
