import {Component} from "@angular/core";
import {DetailsBaseComponent, PageBaseComponent} from "@smartsoft001/angular";
import {CrudListPageBaseComponent} from "@smartsoft001/crud-shell-angular";

// @Component({
//     template: `
//
//         <smart-list *ngIf="listOptions" [hidden]="config.list?.groups" [options]="listOptions"></smart-list>
//         <smart-crud-group *ngIf="config.list?.groups" [groups]="config.list?.groups" [listOptions]="listOptions">
//         </smart-crud-group>
//
//         <smart-crud-filters-config></smart-crud-filters-config>
//     `
// })
export class CustomCrudListComponent extends CrudListPageBaseComponent<any>  {

}