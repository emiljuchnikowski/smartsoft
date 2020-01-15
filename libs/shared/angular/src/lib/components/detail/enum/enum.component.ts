import { Component } from '@angular/core';

import {DetailBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-detail-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.scss']
})
export class DetailEnumComponent<T> extends DetailBaseComponent<T> { }
