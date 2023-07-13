import { Inject, Injectable, Optional } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, from, Observable, of, throwError } from "rxjs";
import decode from "jwt-decode";
import { concatMap, first, switchMap, tap } from "rxjs/operators";

import { IAuthToken } from "@smartsoft001/auth-domain";
import { IUserCredentials } from "@smartsoft001/users";
import {
  StorageService,
  AuthService as SharedAuthService,
  AUTH_TOKEN,
} from "@smartsoft001/angular";

import { AuthConfig } from "../../auth.config";
import {
  AUTH_REQUEST_BODY_PROVIDER,
  IAuthRequestBodyProvider,
} from "../../providers/request-body/request-body.provider";

declare const FB, gapi;

@Injectable()
export class AuthService extends SharedAuthService {
  get token(): IAuthToken {
    const str = this.storageService.getItem(AUTH_TOKEN);

    if (!str) return null;

    return JSON.parse(str);
  }

  set token(val: IAuthToken) {
      const str = JSON.stringify(val);
      this.storageService.setItem(AUTH_TOKEN, str);
  }

  get username(): string {
    if (!this.token) return null;

    const tokenPayload: { sub: string } = decode(
      this.token.access_token
    ) as any;

    return tokenPayload.sub;
  }

  constructor(
    @Optional() private config: AuthConfig,
    private http: HttpClient,
    storageService: StorageService,
    @Optional()
    @Inject(AUTH_REQUEST_BODY_PROVIDER)
    private bodyProvider: IAuthRequestBodyProvider
  ) {
    super(storageService);
  }

  loginFb(): Observable<IAuthToken> {
    return from(
      new Promise<any>((resolve) => FB.login(resolve))
    ).pipe(
      switchMap(({ authResponse }) => {
        if (!authResponse) return EMPTY;

        const baseBody = {
          grant_type: "fb",
          fb_token: authResponse.accessToken,
          client_id: this.config.clientId,
        };

        const obsBody$ = this.bodyProvider
          ? from(this.bodyProvider.get(baseBody))
          : of(baseBody);

        return obsBody$.pipe(
          switchMap((body: string) =>
            this.http
              .post<IAuthToken>(this.config.apiUrl + "/token", body)
              .pipe(
                tap((token) => {
                  this.storageService.setItem(
                    AUTH_TOKEN,
                    JSON.stringify(token)
                  );
                }),
                // TODO : fix
                first()
              )
          )
        ) as Observable<IAuthToken>;
      })
    );
  }

  loginGoogle(): Observable<IAuthToken> {
      return from(
          this.initGoogleAuth()
      ).pipe(
          switchMap((authToken) => {
              const baseBody = {
                  grant_type: "google",
                  google_token: authToken,
                  client_id: this.config.clientId,
              };

              const obsBody$ = this.bodyProvider
                  ? from(this.bodyProvider.get(baseBody))
                  : of(baseBody);

              return obsBody$.pipe(
                  switchMap((body: string) =>
                      this.http
                          .post<IAuthToken>(this.config.apiUrl + "/token", body)
                          .pipe(
                              tap((token) => {
                                  this.storageService.setItem(
                                      AUTH_TOKEN,
                                      JSON.stringify(token)
                                  );
                              }),
                              // TODO : fix
                              first()
                          )
                  )
              ) as Observable<IAuthToken>;
          })
      );
  }

  createToken(userCreds: IUserCredentials, customData?): Observable<IAuthToken> {
    let baseBody = {
      grant_type: "password",
      username: userCreds.username,
      password: userCreds.password,
      client_id: this.config.clientId,
    };

    if (customData) {
        baseBody = {
            ...baseBody,
            ...customData
        };
    }

    const obsBody$ = this.bodyProvider
      ? from(this.bodyProvider.get(baseBody))
      : of(baseBody);

    return obsBody$.pipe(
      switchMap((body: string) =>
        this.http.post<IAuthToken>(this.config.apiUrl + "/token", body).pipe(
          tap((token) => {
            this.storageService.setItem(AUTH_TOKEN, JSON.stringify(token));
          }),
          // TODO : fix
          first()
        )
      )
    ) as Observable<IAuthToken>;
  }

  removeToken(): void {
    this.storageService.removeItem(AUTH_TOKEN);

    if (this.config.facebookId) {
      FB.api("/me/permissions", "delete", null, () => FB.logout());
    }
  }

  refreshToken(): Observable<IAuthToken> {
    if (!this.token) return of();

    return this.http
      .post<IAuthToken>(this.config.apiUrl + "/token", {
        grant_type: "refresh_token",
        refresh_token: this.token.refresh_token,
      })
      .pipe(
        tap((token) => {
          this.storageService.setItem(AUTH_TOKEN, JSON.stringify(token));
        })
      );
  }

  private async initGoogleAuth(): Promise<any> {
      //  Create a new Promise where the resolve
      // function is the callback passed to gapi.load
      const pload = new Promise((resolve) => {
          gapi.load('auth2', resolve);
      });

      // When the first promise resolves, it means we have gapi
      // loaded and that we can call gapi.init
      return pload.then(async () => {
          return await gapi.auth2
              .init({ client_id: this.config.googleId })
              .then(authInstance => {
                  return authInstance.signIn();
              })
              .then(user => {
                  let token;
                  Object.keys(user).forEach(key => {
                      if (user[key].access_token) token = user[key].access_token;
                  })
                  return token;
              })
              .catch(error => {
                  throw error;
              });
      });
  }
}
