import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';

import {getModelFieldsWithOptions, IFieldOptions} from "@smartsoft001/models";
import {IListOptions} from "../../models/interfaces";
import {HardwareService} from "../../services/hardware/hardware.service";

@Component({
  selector: 'smart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', "../../styles/global.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent<T> implements OnInit {
  private _options: IListInternalOptions<T>;

  mobile: boolean;

  @Input() set options(val: IListOptions<T>) {
    this._options = val;
    this.initFields();
  }

  get internalOptions(): IListInternalOptions<T> {
    return this._options;
  }

  constructor(private hardwareService: HardwareService) { }

  ngOnInit() {
    this.mobile = this.hardwareService.isMobile;
  }

  private initFields(): void {
    this._options.fields = _.sortBy(
        getModelFieldsWithOptions(new this._options.type()).filter(item => item.options.list),
        item => item.options.list.order
    );
  }
}

export interface IListInternalOptions<T> extends IListOptions<T> {
  fields?: Array<{ key: string, options: IFieldOptions }>;
}
