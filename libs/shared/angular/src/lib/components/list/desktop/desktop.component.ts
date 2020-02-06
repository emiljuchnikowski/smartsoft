import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

import { ListBaseComponent } from "../base/base.component";
import {IEntity} from "@smartsoft001/domain-core";
import {ToastService} from "../../../services/toast/toast.service";

@Component({
  selector: "smart-list-desktop",
  templateUrl: "./desktop.component.html",
  styleUrls: ["./desktop.component.scss", "../../../styles/desktop.scss"]
})
export class ListDesktopComponent<T extends IEntity<string>> extends ListBaseComponent<T>
  implements OnInit {

  get desktopKeys(): Array<string> {
    if (this.keys) {
      return [
        ...this.keys,
        ...(this.detailsComponent ? ["detailsAction"] : []),
        ...(this.editHandler ? ["editAction"] : [])
      ];
    }

    return null;
  }

  constructor(router: Router, toastService: ToastService, cd: ChangeDetectorRef, translateService: TranslateService) {
    super(router, toastService, cd, translateService);
  }

  ngOnInit() {}
}
