import {
  ChangeDetectionStrategy,
  Component,
  Input, OnDestroy,
} from "@angular/core";
import {Subscription} from "rxjs";

import { IDetailsOptions } from "../../models";

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
export class DetailsComponent<T> implements OnDestroy {
  private _options: IDetailsOptions<T>;
  private _subscription = new Subscription();

  @Input() set options(val: IDetailsOptions<T>) {
    this._options = val;
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
