import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";

import { IEntity } from "@smartsoft001/domain-core";

import { ListBaseComponent } from "../base/base.component";
import {IListComponentFactories, IListInternalOptions} from "../../../models";

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
