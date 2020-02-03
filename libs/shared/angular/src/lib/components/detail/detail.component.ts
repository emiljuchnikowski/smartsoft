import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {IDetailOptions} from "../../models/interfaces";
import {FieldType} from "@smartsoft001/models";

@Component({
  selector: 'smart-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent<T> implements OnInit {
  FieldType = FieldType;

  @Input() options: IDetailOptions<T>;

  constructor() { }

  ngOnInit() {
  }

}
