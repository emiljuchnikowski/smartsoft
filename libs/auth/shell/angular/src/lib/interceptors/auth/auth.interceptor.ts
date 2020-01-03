import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { flatMap, tap } from "rxjs/operators";

import { AuthFacade } from "../../+state/auth.facade";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private facade: AuthFacade) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let changedRequest = req;
    return this.facade.token$.pipe(
      tap(token => {
        const headerSettings: { [name: string]: string | string[] } = {};

        for (const key of req.headers.keys()) {
          headerSettings[key] = req.headers.getAll(key);
        }
        if (token) {
          headerSettings["Authorization"] = "Bearer " + token.access_token;
        }
        headerSettings["Content-Type"] = "application/json";
        const newHeader = new HttpHeaders(headerSettings);

        changedRequest = req.clone({
          headers: newHeader
        });
      }),
      flatMap(() => next.handle(changedRequest))
    );
  }
}
