import { Injectable, Optional } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { pessimisticUpdate } from "@nrwl/angular";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import * as AuthActions from "./auth.actions";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthEffects {
  initToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initToken.type),
      pessimisticUpdate({
        run: () => {
          return AuthActions.initTokenSuccess({
            token: this.service.token,
            username: this.service.username
          });
        },

        onError: (action: ReturnType<typeof AuthActions.initToken>, error) => {
          console.error("Error", error);
          return AuthActions.initTokenFailure({ error });
        }
      })
    )
  );

  createToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createToken.type),
      pessimisticUpdate({
        run: (action: ReturnType<typeof AuthActions.createToken>) => {
          return this.service
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
              )
            );
        },

        onError: (
          action: ReturnType<typeof AuthActions.createToken>,
          error
        ) => {
          console.error("Error", error);
          return AuthActions.createTokenFailure({ error });
        }
      })
    )
  );

  createTokenSuccess$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.createTokenSuccess.type),
        tap(_ => {
          this.router.navigateByUrl("");
        })
      ),
    { dispatch: false }
  );

  removeToken$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.removeToken.type),
      pessimisticUpdate({
        run: () => {
          this.service.removeToken();
          return of(AuthActions.removeTokenSuccess());
        },

        onError: (
          action: ReturnType<typeof AuthActions.removeToken>,
          error
        ) => {
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

  refreshToken$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken.type),
      pessimisticUpdate({
        run: () => {
          return this.service.refreshToken().pipe(
            map(() => {
              return AuthActions.refreshTokenSuccess();
            })
          );
        },

        onError: (
          action: ReturnType<typeof AuthActions.refreshToken>,
          error
        ) => {
          console.error("Error", error);
          return AuthActions.refreshTokenFailure({ error });
        }
      })
    )
  );

  // refreshTokenInterval$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.createTokenSuccess),
  //     switchMap(action =>
  //       interval(((action.token.expired_in * 3) / 4) * 1000).pipe(
  //         map(() => {
  //           return AuthActions.refreshToken();
  //         })
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    @Optional() private service: AuthService,
    private router: Router
  ) {}
}
