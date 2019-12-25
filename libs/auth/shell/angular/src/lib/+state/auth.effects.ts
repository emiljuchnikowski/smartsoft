import { Injectable } from "@angular/core";
import { createEffect, Actions } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/angular";

import * as fromAuth from "./auth.reducer";
import * as AuthActions from "./auth.actions";
import { AuthService } from "../services";
import { map } from "rxjs/operators";
import { removeToken } from "./auth.actions";

@Injectable()
export class AuthEffects {
  initToken$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.initToken, {
      run: (action: ReturnType<typeof AuthActions.initToken>) => {
        return AuthActions.initTokenSuccess({ token: this.service.token });
      },

      onError: (action: ReturnType<typeof AuthActions.initToken>, error) => {
        console.error("Error", error);
        return AuthActions.initTokenFailure({ error });
      }
    })
  );

  createToken$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.createToken, {
      run: (action: ReturnType<typeof AuthActions.createToken>) => {
        return this.service
          .createToken({ username: action.username, password: action.password })
          .pipe(map(token => AuthActions.createTokenSuccess({ token })));
      },

      onError: (action: ReturnType<typeof AuthActions.createToken>, error) => {
        console.error("Error", error);
        return AuthActions.createTokenFailure({ error });
      }
    })
  );

  removeToken$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.removeToken, {
      run: (action: ReturnType<typeof AuthActions.removeToken>) => {
        return this.service.removeToken().pipe(
          map(() => {
            return AuthActions.removeTokenSuccess();
          })
        );
      },

      onError: (action: ReturnType<typeof AuthActions.removeToken>, error) => {
        console.error("Error", error);
        return AuthActions.removeTokenFailure({ error });
      }
    })
  );

  refreshToken$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.refreshToken, {
      run: (action: ReturnType<typeof AuthActions.refreshToken>) => {
        return this.service.refreshToken().pipe(
          map(() => {
            return AuthActions.refreshTokenSuccess();
          })
        );
      },

      onError: (action: ReturnType<typeof AuthActions.refreshToken>, error) => {
        console.error("Error", error);
        return AuthActions.refreshTokenFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private dataPersistence: DataPersistence<fromAuth.AuthPartialState>
  ) {}
}
