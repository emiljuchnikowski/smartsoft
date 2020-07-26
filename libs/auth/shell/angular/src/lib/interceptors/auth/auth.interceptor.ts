import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const changedRequest = this.addAuthHeader(req);

    return next.handle(changedRequest).pipe(
      catchError((error) => {
        return this.handleResponseError(error, req, next);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>) {
    let changedRequest = req;

    const headerSettings: { [name: string]: string | string[] } = {};

    for (const key of req.headers.keys()) {
      headerSettings[key] = req.headers.getAll(key);
    }

    const tokenString = sessionStorage.getItem("AUTH_TOKEN");
    let token;

    if (tokenString) {
      token = JSON.parse(tokenString);
    }

    if (token) {
      headerSettings["Authorization"] = "Bearer " + token.access_token;
    }
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = req.clone({
      headers: newHeader,
    });
    return changedRequest;
  }

  private handleResponseError(
    error: any,
    request?: any,
    next?: HttpHandler
  ): Observable<any> {
    if (error.status === 401) {
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          const changedRequest = this.addAuthHeader(request);
          return next.handle(changedRequest);
        }),
        catchError((e) => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.logout();
          }
        })
      );
    }

    return throwError(error);
  }

  private logout(): void {
    this.authService.removeToken();
    this.router.navigate(["login"]);
  }
}
