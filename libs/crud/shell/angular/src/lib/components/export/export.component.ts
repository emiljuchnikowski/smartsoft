import { Component } from '@angular/core';

import {IButtonOptions, PopoverService} from "@smartsoft001/angular";
import {IEntity} from "@smartsoft001/domain-core";

import {CrudFacade} from "../../+state/crud.facade";

@Component({
  selector: 'smart-crud-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent<T extends IEntity<string>> {

  buttonExportCsvOptions: IButtonOptions = {
    click: () => {
      this.facade.export({
        offset: null,
        limit: null
      }, 'csv');
      this.popoverService.close();
    },
    expand: 'block'
  };
  buttonExportXlsxOptions: IButtonOptions = {
    click: () => {
      this.facade.export({
        offset: null,
        limit: null
      }, 'xlsx');
      this.popoverService.close();
    },
    expand: "block"
  };

  constructor(
      private facade: CrudFacade<T>,
      private popoverService: PopoverService
  ) { }
}
