import {AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { IEntity } from "@smartsoft001/domain-core";

import { ListBaseComponent } from "../base/base.component";
import { AlertService } from "../../../services/alert/alert.service";
import { AuthService } from "../../../services/auth/auth.service";
import {IListInternalOptions} from "../list.component";
import {IListComponentFactories} from "../../../models";

@Component({
  selector: "smart-list-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.scss"],
})
export class ListMobileComponent<T extends IEntity<string>>
  extends ListBaseComponent<T>
  implements AfterViewInit {

  componentFactories: IListComponentFactories<T>;

  @ViewChild("topTpl", { read: ViewContainerRef, static: true })
  topTpl: ViewContainerRef;

  constructor(
    authService: AuthService,
    router: Router,
    alertService: AlertService,
    cd: ChangeDetectorRef,
    translateService: TranslateService
  ) {
    super(authService, router, alertService, cd, translateService);
  }

  protected initList(val: IListInternalOptions<T>): void {
    super.initList(val);

    this.componentFactories = val.componentFactories;

    this.generateDynamicComponents();
  }

  ngAfterViewInit(): void {
    this.generateDynamicComponents();
  }

  private generateDynamicComponents(): void {
    if (!this.componentFactories) return;

    if (this.componentFactories.top && this.topTpl) {
      if (!this.topTpl.get(0)) {
        this.topTpl.createComponent(this.componentFactories.top);
      }
    }
  }
}
