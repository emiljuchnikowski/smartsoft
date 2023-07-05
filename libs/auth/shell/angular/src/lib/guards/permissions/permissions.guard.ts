import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class PermissionsGuard  {
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
