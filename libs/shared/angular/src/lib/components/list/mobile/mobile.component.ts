import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ListBaseComponent} from "../base/base.component";
import {IEntity} from "@smartsoft001/domain-core";
import {ToastService} from "../../../services/toast/toast.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'smart-list-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class ListMobileComponent<T extends IEntity<string>> extends ListBaseComponent<T> implements OnInit {
  constructor(router: Router, toastService: ToastService, cd: ChangeDetectorRef, translateService: TranslateService) {
    super(router, toastService, cd, translateService);
  }

  ngOnInit() {
  }
}
