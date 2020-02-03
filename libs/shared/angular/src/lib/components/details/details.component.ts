import {
  ChangeDetectionStrategy,
  Component,
  Input, OnDestroy,
} from "@angular/core";
import {Subscription} from "rxjs";

import { IDetailsOptions } from "../../models";
import {IEntity} from "@smartsoft001/domain-core";

@Component({
  selector: "smart-details",
  template: `
      <smart-details-standard
            *ngIf="options"
            [options]="options"
      ></smart-details-standard>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent<T extends IEntity<string>> implements OnDestroy {
  private _options: IDetailsOptions<T>;
  private _subscription = new Subscription();

  item: T;

  @Input() set options(val: IDetailsOptions<T>) {
    this._options = val;

    this._subscription.add(this._options.item$.subscribe(item => {
      this.item = item;
    }));
  }
  get options(): IDetailsOptions<T> {
    return this._options;
  }

  ngOnDestroy(): void {
    if (this._subscription){
      this._subscription.unsubscribe();
    }
  }
}
