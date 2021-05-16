import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';

import {getModelFieldsWithOptions, IFieldListMetadata, IFieldOptions} from "@smartsoft001/models";
import {IListOptions, ListMode} from "../../models/interfaces";
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

  mode: ListMode;

  ListMode = ListMode;

  @Input() set options(val: IListOptions<T>) {
    this._options = val;
    this.initFields();
    this.initModel();
  }

  get internalOptions(): IListInternalOptions<T> {
    return this._options;
  }

  constructor(private hardwareService: HardwareService) { }

  ngOnInit() {

  }

  private initFields(): void {
    this._options.fields = _.sortBy(
        getModelFieldsWithOptions(new this._options.type()).filter(item => item.options.list),
        item => (item.options.list as IFieldListMetadata).order
    );
  }

  private initModel(): void {
    if (this._options.mode) {
      this.mode = this._options.mode;
    } else {
      this.mode = this.hardwareService.isMobileWeb ? ListMode.mobile : ListMode.desktop
    }
  }
}

export interface IListInternalOptions<T> extends IListOptions<T> {
  fields?: Array<{ key: string, options: IFieldOptions }>;
}
