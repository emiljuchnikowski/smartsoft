import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";
import * as _ from 'lodash';

import {IListOptions} from "../../models";
import {getModelFieldsWithOptions, IFieldOptions} from "@smartsoft001/models";

@Component({
  selector: 'smart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent<T> implements OnInit {
  private _options: IListOptions<T>;

  mobile: boolean;
  fields: Array<{ key: string, options: IFieldOptions }>;

  @Input() set options(val: IListOptions<T>) {
    this._options = val;
    this.initFields();
  }

  constructor(private deviceDetector: DeviceDetectorService) { }

  ngOnInit() {
    this.mobile = this.deviceDetector.isMobile();
  }

  private initFields(): void {
    this.fields = getModelFieldsWithOptions(new this._options.type())
        .filter(item => item.options.list)
        ;
    console.log(this.fields);
  }
}
