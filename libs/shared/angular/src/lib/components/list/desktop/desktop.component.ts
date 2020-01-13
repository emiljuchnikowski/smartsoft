import { Component, OnInit } from "@angular/core";

import { ListBaseComponent } from "../base/base.component";

@Component({
  selector: "smart-list-desktop",
  templateUrl: "./desktop.component.html",
  styleUrls: ["./desktop.component.scss", "../../../styles/desktop.scss"]
})
export class ListDesktopComponent<T> extends ListBaseComponent<T>
  implements OnInit {
  desktopKeys: Array<string>;

  protected initKeys(): void {
    super.initKeys();

    this.desktopKeys = [...this.keys, "detailsAction"];
  }

  ngOnInit() {}
}
