import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {FingerprintService} from "@smartsoft001/angular";

import * as fromAuth from "./auth.reducer";
import * as AuthSelectors from "./auth.selectors";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthFacade {
  get isSetFingerprint(): boolean {
    return this.fingerprintService.isSet();
  }

  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  token$ = this.store.pipe(select(AuthSelectors.getAuthToken));
  username$ = this.store.pipe(select(AuthSelectors.getAuthUsername));

  constructor(
    private store: Store<fromAuth.AuthPartialState>,
    private fingerprintService: FingerprintService
  ) {}

  async checkFingerprint(): Promise<void> {
    let data = null;

    try {
      data = await this.fingerprintService.getDate();
    } catch (e) {
      console.warn(e);
    }

    if (data) {
      this.login(data);
    }
  }

  init(): void {
    this.store.dispatch(AuthActions.initToken());
  }

  login(model: { username: string; password: string }): void {
    this.store.dispatch(AuthActions.createToken(model));
  }

  logout(): void {
    this.store.dispatch(AuthActions.removeToken());
  }
}
