import {Component} from "@angular/core";

import {IEntity} from "@smartsoft001/domain-core";

import {CrudListPageBaseComponent} from "../base/base.component";

@Component({
    selector: "smart-crud-list-standard-page",
    templateUrl: "./standard.component.html",
    styleUrls: ["./standard.component.scss"],
})
export class ListStandardComponent<T extends IEntity<string>> extends CrudListPageBaseComponent<T> {}