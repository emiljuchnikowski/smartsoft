import { Inject, Injectable, Optional } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable, of } from "rxjs";
import decode from "jwt-decode";
import { first, switchMap, tap } from "rxjs/operators";

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

@Injectable()
export class AuthService extends SharedAuthService {
  get token(): IAuthToken {
    const str = this.storageService.getItem(AUTH_TOKEN);

    if (!str) return null;

    return JSON.parse(str);
  }

  get username(): string {
    if (!this.token) return null;

    const tokenPayload: { sub: string } = decode(this.token.access_token) as any;

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

  createToken(userCreds: IUserCredentials): Observable<IAuthToken> {
    const baseBody = {
      grant_type: "password",
      username: userCreds.username,
      password: userCreds.password,
      client_id: this.config.clientId,
    };

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
  }

  refreshToken(): Observable<IAuthToken> {
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
}
