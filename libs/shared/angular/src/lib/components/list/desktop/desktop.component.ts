import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";

import { ListBaseComponent } from "../base/base.component";
import {IEntity} from "@smartsoft001/domain-core";

@Component({
  selector: "smart-list-desktop",
  templateUrl: "./desktop.component.html",
  styleUrls: ["./desktop.component.scss", "../../../styles/desktop.scss"]
})
export class ListDesktopComponent<T extends IEntity<string>> extends ListBaseComponent<T>
  implements OnInit {

  get desktopKeys(): Array<string> {
    if (this.keys) {
      if (this.detailsComponent) {
        return [
          ...this.keys,
          "detailsAction"
        ];
      } else {
        return this.keys;
      }
    }

    return null;
  }

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}
