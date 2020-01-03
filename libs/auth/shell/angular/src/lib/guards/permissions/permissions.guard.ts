import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { AuthService } from "../../services";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedPermissions = route.data.expectedPermissions;
    const result = this.auth.expectPermissions(expectedPermissions);

    if (!result) {
      this.router.navigate(["login"]);
    }

    return result;
  }
}
