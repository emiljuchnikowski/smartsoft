import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { MatSort } from "@angular/material/sort";

import { IEntity } from "@smartsoft001/domain-core";

import { ListBaseComponent } from "../base/base.component";
import { AlertService } from "../../../services/alert/alert.service";
import { IListComponentFactories } from "../../../models";
import { IListInternalOptions } from "../list.component";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "smart-list-desktop",
  templateUrl: "./desktop.component.html",
  styleUrls: ["./desktop.component.scss", "../../../styles/desktop.scss"],
})
export class ListDesktopComponent<T extends IEntity<string>>
  extends ListBaseComponent<T>
  implements OnInit, OnDestroy, AfterViewInit {
  private _subscriptions = new Subscription();
  private _multiSelected = [];

  componentFactories: IListComponentFactories<T>;

  get desktopKeys(): Array<string> {
    if (this.keys) {
      return [
        ...(this.selectMode === 'multi' ? ["selectMulti"] : []),
        ...this.keys,
        ...(this.removeHandler ? ["removeAction"] : []),
          // TODO : nikt tego nie chce :(
        //...(this.detailsComponent ? ["detailsAction"] : []),
        ...(this.itemHandler ? ["itemAction"] : []),
      ];
    }

    return null;
  }

  @ViewChild(MatSort, { static: true }) sortObj: MatSort;
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

  onChangeMultiselect(checked: boolean, element: T, list: T[]) {
    this._multiSelected = this._multiSelected.filter(m => list.some(i => i === m));

    if (checked) {
      this._multiSelected.push(element);
    } else {
      const index = this._multiSelected.indexOf(element);
      if (index > -1) {
        this._multiSelected.splice(index, 1);
      }
    }

    if (this.provider.onChangeMultiSelected) {
      this.provider.onChangeMultiSelected(this._multiSelected);
    }
  }

  ngAfterViewInit(): void {
    this.generateDynamicComponents();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.sort) {
      this.sortObj.active = this.sort["default"];
      this.sortObj.direction = this.sort["defaultDesc"] ? "desc" : "asc";

      this._subscriptions.add(
        this.sortObj.sortChange.subscribe((sort) => {
          this.provider.getData({
            offset: 0,
            sortBy: sort.active ? sort.active : "",
            sortDesc: this.sortObj.direction === "desc",
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

  private generateDynamicComponents(): void {
    if (!this.componentFactories) return;

    if (this.componentFactories.top && this.topTpl) {
      if (!this.topTpl.get(0)) {
        this.topTpl.createComponent(this.componentFactories.top);
      }
    }
  }
}
