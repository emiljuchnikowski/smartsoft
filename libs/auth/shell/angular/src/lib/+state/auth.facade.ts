import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";

import * as fromAuth from "./auth.reducer";
import * as AuthSelectors from "./auth.selectors";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  token$ = this.store.pipe(select(AuthSelectors.getAuthToken));

  constructor(private store: Store<fromAuth.AuthPartialState>) {}

  init(): void {
    this.store.dispatch(AuthActions.initToken());
  }
}
