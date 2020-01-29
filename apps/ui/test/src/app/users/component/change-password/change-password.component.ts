import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {User} from "../../user.dto";
import {IButtonOptions, IFormOptions} from "@smartsoft001/angular";
import {CrudFacade} from "@smartsoft001/crud-shell-angular";
import {map} from "rxjs/operators";

@Component({
  selector: 'smartsoft-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  private _user: User;

  partialModel: Partial<User>;
  valid: boolean;
  formOptions: IFormOptions<User> = {
    mode: 'changePassword',
    model: new User(),
    loading$: this.facade.loaded$.pipe(map(x => !x))
  };

  buttonOptions: IButtonOptions = {
    type: 'submit',
    confirm: true,
    click: () => {
      this.partialModel.id = this._user.id;
      this.facade.updatePartial(this.partialModel as any);
      this.formOptions = {
        mode: 'changePassword',
        model: new User(),
        loading$: this.facade.loaded$.pipe(map(x => !x))
      };
    }
  };

  constructor(public facade: CrudFacade<User>) { }

  ngOnInit(): void {
    this._subscriptions.add(this.facade.selected$.subscribe(selected => {
      this._user = selected;
    }));
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
