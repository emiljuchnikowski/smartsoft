import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";

import * as fromAuth from "../../+state/auth.reducer";
import * as AuthSelectors from "../../+state/auth.selectors";
import * as AuthActions from "../../+state/auth.actions";

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  token$ = this.store.pipe(select(AuthSelectors.getAuthToken));

  constructor(private store: Store<fromAuth.AuthPartialState>) {}

  init(): void {
    this.store.dispatch(AuthActions.initToken());
  }

  logout(): void {
    this.store.dispatch(AuthActions.removeToken());
  }
}
