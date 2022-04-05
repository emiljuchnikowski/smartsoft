import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-date-with-edit',
  templateUrl: './date-with-edit.component.html',
  styleUrls: ['./date-with-edit.component.scss']
})
export class InputDateWithEditComponent<T> extends InputBaseComponent<T> implements OnDestroy {
  private _subscriptions = new Subscription();

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
