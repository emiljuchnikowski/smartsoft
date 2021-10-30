import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy, QueryList, TemplateRef, ViewChild, ViewChildren,
} from "@angular/core";
import { Subscription } from "rxjs";

import { IDetailsOptions } from "../../models";
import { IEntity } from "@smartsoft001/domain-core";
import { CreateDynamicComponent } from "../base";
import { DetailsBaseComponent } from "./base/base.component";
import {DynamicContentDirective} from "../../directives";

@Component({
  selector: "smart-details",
  template: `
    <smart-details-standard
      *ngIf="options && template === 'default'"
      [options]="options"
    ></smart-details-standard>
    <div #customTpl></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent<T extends IEntity<string>>
  extends CreateDynamicComponent<DetailsBaseComponent<any>>("details")
  implements OnDestroy
{
  private _options: IDetailsOptions<T>;
  private _subscription = new Subscription();

  item: T;

  @Input() set options(val: IDetailsOptions<T>) {
    this._options = val;

    this._subscription.add(
      this._options.item$.subscribe((item) => {
        this.item = item;
      })
    );

    this.refreshDynamicInstance();
  }
  get options(): IDetailsOptions<T> {
    return this._options;
  }

  @ViewChild("contentTpl", { read: TemplateRef, static: false })
  contentTpl: TemplateRef<any>;

  @ViewChildren(DynamicContentDirective, { read: DynamicContentDirective })
  dynamicContents = new QueryList<DynamicContentDirective>();

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  refreshProperties(): void {
    this.baseInstance.options = this.options;
  }
}
