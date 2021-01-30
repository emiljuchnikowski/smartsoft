import { Component, Input, OnInit } from "@angular/core";

import { IFieldOptions } from "@smartsoft001/models";
import {ICrudFilter} from "@smartsoft001/crud-shell-angular";

@Component({
  selector: "smart-crud-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  @Input() item: { key: string; options: IFieldOptions };
  @Input() filter: ICrudFilter;

  constructor() {}

  ngOnInit(): void {}
}
