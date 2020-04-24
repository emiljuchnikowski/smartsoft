import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonDatetime} from "@ionic/angular";
import {Subscription} from "rxjs";
import * as momentImport from "moment";

const moment = momentImport;

import {InputBaseComponent} from "../base/base.component";

@Component({
  selector: 'smart-input-date-with-edit',
  templateUrl: './date-with-edit.component.html',
  styleUrls: ['./date-with-edit.component.scss']
})
export class InputDateWithEditComponent<T> extends InputBaseComponent<T> implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();

   @ViewChild(IonDatetime, { read: IonDatetime, static: false }) dateTimePicker: IonDatetime;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  open(): void {
    this.dateTimePicker.open();
  }

  ngOnInit(): void {
    if (this.dateTimePicker) {
      this._subscriptions.add(this.dateTimePicker.ionChange.subscribe((val: CustomEvent) => {
        this.control.setValue(moment(val.detail.value).format('YYYY-MM-DD'));
      }));
    } else {
      console.error('dateTimePicker not found!');
    }
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
