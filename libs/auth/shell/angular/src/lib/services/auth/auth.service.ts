import {Injectable, Optional} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import decode from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";
import {first, tap} from "rxjs/operators";

import { AuthConfig } from "../../auth.config";
import { IAuthToken } from "@smartsoft001/auth-domain";
import { IUserCredentials } from "@smartsoft001/users";
import {StorageService} from "@smartsoft001/angular";

export const AUTH_TOKEN = "AUTH_TOKEN";

@Injectable()
export class AuthService {
  get token(): IAuthToken {
    const str = this.storageService.getItem(AUTH_TOKEN);

    if (!str) return null;

    return JSON.parse(str);
  }

  get username(): string {
    if (!this.token) return null;

    const tokenPayload = decode(this.token.access_token);

    return tokenPayload.sub;
  }

  constructor(
      @Optional() private config: AuthConfig,
      private http: HttpClient,
      private storageService: StorageService
  ) {

  }

  createToken(userCreds: IUserCredentials): Observable<IAuthToken> {
    return this.http
      .post<IAuthToken>(this.config.apiUrl + "/token", {
        grant_type: "password",
        username: userCreds.username,
        password: userCreds.password,
        client_id: this.config.clientId
      })
      .pipe(
        tap(token => {
          this.storageService.setItem(AUTH_TOKEN, JSON.stringify(token));
        }),
        // TODO : fix
        first()
      );
  }

  removeToken(): void {
    this.storageService.removeItem(AUTH_TOKEN);
  }

  refreshToken(): Observable<IAuthToken> {
    return this.http
      .post<IAuthToken>(this.config.apiUrl + "/token", {
        grant_type: 'refresh_token',
        refresh_token: this.token.refresh_token
      })
      .pipe(
        tap(token => {
          this.storageService.setItem(AUTH_TOKEN, JSON.stringify(token));
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  expectPermissions(permissions: Array<string>): boolean {
    const token = this.getToken();

    if (!token) return false;

    const tokenPayload = decode(token.access_token);

    return (
      this.isAuthenticated() &&
      tokenPayload.permissions &&
      permissions.some(p =>
        (tokenPayload.permissions as Array<string>).some(tp => p === tp)
      )
    );
  }

  private getToken(): IAuthToken {
    const token = this.storageService.getItem(AUTH_TOKEN);

    if (!token) return null;

    return JSON.parse(token) as IAuthToken;
  }
}
