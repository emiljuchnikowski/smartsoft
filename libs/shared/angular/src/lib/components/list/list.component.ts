import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ComponentFactoryResolver,
  Input,
  NgModuleRef,
  OnInit, QueryList, TemplateRef, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import * as _ from 'lodash';

import {getModelFieldsWithOptions, IFieldListMetadata, IFieldOptions} from "@smartsoft001/models";
import {IListOptions, ListMode} from "../../models/interfaces";
import {HardwareService} from "../../services/hardware/hardware.service";
import {CreateDynamicComponent} from "../base";
import {ListBaseComponent} from "./base/base.component";
import {DynamicContentDirective} from "../../directives/dynamic-content/dynamic-content.directive";

@Component({
  selector: 'smart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', "../../styles/global.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent<T> extends CreateDynamicComponent<ListBaseComponent<any>>('list') implements OnInit {
  private _options: IListInternalOptions<T>;

  mode: ListMode;

  ListMode = ListMode;

  @Input() set options(val: IListOptions<T>) {
    this._options = val;
    this.initFields();
    this.initModel();
    this.refreshDynamicInstance();
  }

  get internalOptions(): IListInternalOptions<T> {
    return this._options;
  }

  @ViewChild("contentTpl", { read: TemplateRef, static: false })
  contentTpl: TemplateRef<any>;

  @ViewChildren(DynamicContentDirective, { read: DynamicContentDirective })
  dynamicContents = new QueryList<DynamicContentDirective>();

  constructor(
      private hardwareService: HardwareService,
      private cd: ChangeDetectorRef,
      private moduleRef: NgModuleRef<any>,
      private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(cd, moduleRef, componentFactoryResolver);
  }

  ngOnInit() {

  }

  refreshProperties(): void {
    this.baseInstance.options = this.internalOptions;
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
