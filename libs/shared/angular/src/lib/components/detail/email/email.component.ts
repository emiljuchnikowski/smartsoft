import { Component } from '@angular/core';

import {DetailBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-detail-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class DetailEmailComponent<T> extends DetailBaseComponent<T> { }
