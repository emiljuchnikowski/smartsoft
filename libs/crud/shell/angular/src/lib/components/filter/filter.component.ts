import { Component, Input, OnInit } from "@angular/core";

import {IModelFilter} from "@smartsoft001/models";
import {ICrudFilter} from "@smartsoft001/crud-shell-angular";

@Component({
  selector: "smart-crud-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  @Input() item: IModelFilter;
  @Input() filter: ICrudFilter;

  constructor() {}

  ngOnInit(): void {}
}
