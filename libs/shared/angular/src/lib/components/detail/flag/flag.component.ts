import { Component } from '@angular/core';

import {DetailBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-detail-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class DetailFlagComponent<T> extends DetailBaseComponent<T> { }
