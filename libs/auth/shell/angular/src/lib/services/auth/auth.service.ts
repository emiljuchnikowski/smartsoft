import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {AuthConfig} from "../../auth.config";
import {IAuthToken} from "@smartsoft001/auth-domain";
import {tap} from "rxjs/operators";
import {IUserCredentials} from "@smartsoft001/users";

export const AUTH_TOKEN = 'AUTH_TOKEN';

@Injectable()
export class AuthService {

  get token(): IAuthToken {
    const str = sessionStorage.getItem(AUTH_TOKEN);

    if (!str) return null;

    return JSON.parse(str);
  }

  constructor(private config: AuthConfig, private http: HttpClient) { }

  createToken(userCreds: IUserCredentials): Observable<IAuthToken> {
    return this.http.post<IAuthToken>(this.config.apiUrl + '/token', {
      grant_type: 'password',
      username: userCreds.username,
      password: userCreds.password,
      client_id: this.config.clientId
    }).pipe(
        tap(token => {
          sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
        })
    );
  }

  removeToken(): Observable<void> {
    sessionStorage.removeItem(AUTH_TOKEN);
    return of();
  };

  refreshToken(): Observable<IAuthToken> {
    const data = `grant_type=refresh_token&refresh_token=${this.token.refresh_token}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<IAuthToken>(this.config.apiUrl + '/token', data, { headers }).pipe(
        tap(token => {
          sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
        })
    );
  }
}
