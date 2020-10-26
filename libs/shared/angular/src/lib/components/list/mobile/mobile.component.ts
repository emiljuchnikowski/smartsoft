import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { IEntity } from "@smartsoft001/domain-core";

import { ListBaseComponent } from "../base/base.component";
import { ToastService } from "../../../services/toast/toast.service";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "smart-list-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.scss"],
})
export class ListMobileComponent<T extends IEntity<string>>
  extends ListBaseComponent<T>
  implements OnInit {
  constructor(
    authService: AuthService,
    router: Router,
    toastService: ToastService,
    cd: ChangeDetectorRef,
    translateService: TranslateService
  ) {
    super(authService, router, toastService, cd, translateService);
  }

  ngOnInit() {}
}
