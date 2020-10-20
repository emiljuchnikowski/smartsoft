import { Injectable, Optional } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { pessimisticUpdate } from "@nrwl/angular";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import * as AuthActions from "./auth.actions";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthEffects {
  initToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initToken.type),
      map(() => {
        try {
          return AuthActions.initTokenSuccess({
            token: this.service.token,
            username: this.service.username
          });
        } catch (error) {
          console.error("Error", error);
          return AuthActions.initTokenFailure({ error });
        }
      })
    )
  );

  createToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createToken.type),
      switchMap((action: ReturnType<typeof AuthActions.createToken>) =>
        this.service
          .createToken({
            username: action.username,
            password: action.password
          })
          .pipe(
            map(
              token =>
                AuthActions.createTokenSuccess({
                  token,
                  username: action.username
                }) as any
            ),
            catchError(error => of(AuthActions.createTokenFailure({ error })))
          )
      )
    )
  );

  createTokenSuccess$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.createTokenSuccess.type),
        tap(_ => {
            window.location.href = '';
        })
      ),
    { dispatch: false }
  );

  removeToken$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.removeToken.type),
      map(() => {
        try {
          this.service.removeToken();
          return AuthActions.removeTokenSuccess();
        } catch (error) {
          console.error("Error", error);
          return AuthActions.removeTokenFailure({ error });
        }
      })
    )
  );

  removeTokenSuccess$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.removeTokenSuccess.type),
        tap(_ => {
          document.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    @Optional() private service: AuthService,
    private router: Router
  ) {}
}
