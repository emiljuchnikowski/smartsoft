import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";

import * as fromAuth from "./auth.reducer";
import * as AuthSelectors from "./auth.selectors";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  token$ = this.store.pipe(select(AuthSelectors.getAuthToken));
  username$ = this.store.pipe(select(AuthSelectors.getAuthUsername));
  error$ = this.store.pipe(select(AuthSelectors.getAuthError));

  constructor(
    private store: Store<fromAuth.AuthPartialState>
  ) {}

  init(): void {
    this.store.dispatch(AuthActions.initToken());
  }

  login(model: { username: string; password: string, customData? }): void {
    this.store.dispatch(AuthActions.createToken(model));
  }

  logout(): void {
    this.store.dispatch(AuthActions.removeToken());
  }

  loginFb(): void {
    this.store.dispatch(AuthActions.loginFB());
  }

  loginGoogle(): void {
    this.store.dispatch(AuthActions.loginGoogle());
  }
}
