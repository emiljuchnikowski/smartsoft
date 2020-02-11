import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import { Injectable } from "@angular/core";
import {AUTH_TOKEN} from "../../services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let changedRequest = req;

      const headerSettings: { [name: string]: string | string[] } = {};

      for (const key of req.headers.keys()) {
          headerSettings[key] = req.headers.getAll(key);
      }

      const tokenString = sessionStorage.getItem('AUTH_TOKEN');
      let token;

      if (tokenString) {
          token = JSON.parse(tokenString);
      }

      if (token) {
          headerSettings["Authorization"] = "Bearer " + token.access_token;
      }
      //headerSettings["Content-Type"] = "application/json";
      const newHeader = new HttpHeaders(headerSettings);

      changedRequest = req.clone({
          headers: newHeader
      });

      return next.handle(changedRequest);
  }
}
