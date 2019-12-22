import { Injectable } from "@angular/core";
import { createEffect, Actions } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/angular";

import * as fromAuth from "./auth.reducer";
import * as AuthActions from "./auth.actions";
import {AuthService} from "../services";
import {map} from "rxjs/operators";

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
                return this.service.createToken({ username: action.username, password: action.password }).pipe(
                    map(token => AuthActions.createTokenSuccess({ token }))
                );
            },

            onError: (action: ReturnType<typeof AuthActions.createToken>, error) => {
                console.error("Error", error);
                return AuthActions.createTokenFailure({ error });
            }
        })
    );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private dataPersistence: DataPersistence<fromAuth.AuthPartialState>
  ) {}
}
