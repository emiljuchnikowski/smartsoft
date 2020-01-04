import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import decode from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";
import { first, tap } from "rxjs/operators";

import { AuthConfig } from "../../auth.config";
import { IAuthToken } from "@smartsoft001/auth-domain";
import { IUserCredentials } from "@smartsoft001/users";

export const AUTH_TOKEN = "AUTH_TOKEN";

@Injectable()
export class AuthService {
  get token(): IAuthToken {
    const str = sessionStorage.getItem(AUTH_TOKEN);

    if (!str) return null;

    return JSON.parse(str);
  }

  constructor(private config: AuthConfig, private http: HttpClient) {}

  static getToken(): IAuthToken {
    const token = sessionStorage.getItem(AUTH_TOKEN);

    if (!token) return null;

    return JSON.parse(token) as IAuthToken;
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
          sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
        }),
        // TODO : fix
        first()
      );
  }

  removeToken(): Observable<void> {
    sessionStorage.removeItem(AUTH_TOKEN);
    return of();
  }

  refreshToken(): Observable<IAuthToken> {
    const data = `grant_type=refresh_token&refresh_token=${this.token.refresh_token}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post<IAuthToken>(this.config.apiUrl + "/token", data, { headers })
      .pipe(
        tap(token => {
          sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
        })
      );
  }

  isAuthenticated(): boolean {
    const token = AuthService.getToken();
    const helper = new JwtHelperService();

    if (!token) return false;

    return !helper.isTokenExpired(token.access_token);
  }

  expectPermissions(permissions: Array<string>): boolean {
    const token = AuthService.getToken();

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
}
