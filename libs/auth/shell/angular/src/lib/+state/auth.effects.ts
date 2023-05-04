import { Injectable, Optional } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { pessimisticUpdate } from "@nx/angular";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import * as AuthActions from "./auth.actions";
import { AuthService } from "../services/auth/auth.service";
import { NavController, Platform } from "@ionic/angular";
import { FingerprintService } from "@smartsoft001/angular";

@Injectable()
export class AuthEffects {
  initToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initToken.type),
      map(() => {
        try {
          return AuthActions.initTokenSuccess({
            token: this.service.token,
            username: this.service.username,
          });
        } catch (error) {
          console.error("Error", error);
          this.fingerprintService.clearData();
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
          .createToken(
            {
              username: action.username,
              password: action.password,
            },
            action.customData
          )
          .pipe(
            map(
              (token) =>
                AuthActions.createTokenSuccess({
                  token,
                  username: action.username,
                }) as any
            ),
            catchError((error) => {
              this.fingerprintService.clearData();
              return of(AuthActions.createTokenFailure({ error }));
            })
          )
      )
    )
  );

  loginFb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFB.type),
      switchMap((action: ReturnType<typeof AuthActions.loginFB>) =>
        this.service.loginFb().pipe(
          map(
            (token) =>
              AuthActions.createTokenSuccess({
                token,
                username: token.username,
              }) as any
          ),
          catchError((error) => {
            this.fingerprintService.clearData();
            return of(AuthActions.createTokenFailure({ error }));
          })
        )
      )
    )
  );

  loginGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginGoogle.type),
      switchMap((action: ReturnType<typeof AuthActions.loginGoogle>) =>
        this.service.loginGoogle().pipe(
          map(
            (token) =>
              AuthActions.createTokenSuccess({
                token,
                username: token.username,
              }) as any
          ),
          catchError((error) => {
            this.fingerprintService.clearData();
            return of(AuthActions.createTokenFailure({ error }));
          })
        )
      )
    )
  );

  createTokenSuccess$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.createTokenSuccess.type),
        tap((_) => {
          this.navCtrl.navigateRoot("");
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
        tap((_) => {
          document.location.hash = "login";
          document.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    @Optional() private service: AuthService,
    private navCtrl: NavController,
    private platform: Platform,
    private fingerprintService: FingerprintService
  ) {}
}
