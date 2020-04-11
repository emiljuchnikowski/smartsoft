import {Injectable, Injector, Optional} from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Optional() private injector: Injector, private router: Router) {}

  canActivate(): boolean {
    if (!this.injector.get(AuthService).isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
