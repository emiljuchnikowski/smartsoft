import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatSort } from "@angular/material";

import { ListBaseComponent } from "../base/base.component";
import { IEntity } from "@smartsoft001/domain-core";
import { ToastService } from "../../../services/toast/toast.service";
import { Subscription } from "rxjs";

@Component({
  selector: "smart-list-desktop",
  templateUrl: "./desktop.component.html",
  styleUrls: ["./desktop.component.scss", "../../../styles/desktop.scss"]
})
export class ListDesktopComponent<T extends IEntity<string>>
  extends ListBaseComponent<T>
  implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();

  get desktopKeys(): Array<string> {
    if (this.keys) {
      return [
        ...this.keys,
        ...(this.removeHandler ? ["removeAction"] : []),
        ...(this.editHandler ? ["editAction"] : []),
        ...(this.detailsComponent ? ["detailsAction"] : [])
      ];
    }

    return null;
  }

  @ViewChild(MatSort, { static: true }) sortObj: MatSort;

  constructor(
    router: Router,
    toastService: ToastService,
    cd: ChangeDetectorRef,
    translateService: TranslateService
  ) {
    super(router, toastService, cd, translateService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.sort) {
      this.sortObj.active = this.sort["default"];
      this.sortObj.direction = this.sort["defaultDesc"] ? "desc" : "asc";

      this._subscriptions.add(
        this.sortObj.sortChange.subscribe(sort => {
          this.provider.getData({
            sortBy: sort.active ? sort.active : "",
            sortDesc: this.sortObj.direction === "desc"
          });
        })
      );
    } else {
      this.sortObj.disabled = true;
    }
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
