import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";

import {User} from "../../user.dto";
import {IButtonOptions, IFormOptions} from "@smartsoft001/angular";
import {CrudFacade} from "@smartsoft001/crud-shell-angular";
import {map} from "rxjs/operators";
import {UserService} from "../../services";

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
    loading$: this.facade.loaded$.pipe(map(x => !x)),
    possibilities: {
      mode: of([
        { id: 12, text: 'test1' },
        { id: 13, text: 'test2' }
      ])
    }
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

  constructor(public facade: CrudFacade<User>, private service: UserService) { }

  async ngOnInit(): Promise<void> {
    this._subscriptions.add(this.facade.selected$.subscribe(selected => {
      this._user = selected;
    }));

    console.log('Action result', this.service.log1());
    console.log('Action result (promise)', await this.service.log2());

    this.service.log3(2, new Date()).subscribe((...args) => {
      console.log('Action result (rxjs)', args);
    });
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
