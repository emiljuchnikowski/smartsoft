import { Injectable } from "@angular/core";
import {Action, ActionsSubject, select, Store} from "@ngrx/store";
import {filter} from "rxjs/operators";
import {IAuthToken} from "@smartsoft001/auth-domain";

import * as fromAuth from "./auth.reducer";
import * as AuthSelectors from "./auth.selectors";
import * as AuthActions from "./auth.actions";
import {AuthConfig} from "../auth.config";

@Injectable()
export class AuthFacade {
  private _intervalId: any;

  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  token$ = this.store.pipe(select(AuthSelectors.getAuthToken));
  username$ = this.store.pipe(select(AuthSelectors.getAuthUsername));

  constructor(private store: Store<fromAuth.AuthPartialState>, private config: AuthConfig, private actions$: ActionsSubject) {
    this.actions$.pipe(
        filter(action => action.type === AuthActions.createTokenSuccess.type)
    ).subscribe((action: Action & { token: IAuthToken }) => {
      if (this._intervalId) {
        clearInterval(this._intervalId);
      }

      this._intervalId = setInterval(() => {
        this.store.dispatch(AuthActions.refreshToken());
      }, action.token.expired_in * 0.75 * 1000);
    });
  }

  init(): void {
    this.store.dispatch(AuthActions.initToken());
  }

  login(model: { username: string, password: string }): void {
    this.store.dispatch(AuthActions.createToken(model));
  }

  logout(): void {
    this.store.dispatch(AuthActions.removeToken());
  }
}
