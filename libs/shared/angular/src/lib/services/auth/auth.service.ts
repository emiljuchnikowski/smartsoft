import { Injectable } from "@angular/core";
import decode from "jwt-decode";

import { StorageService } from "../storage/storage.service";

export const AUTH_TOKEN = "AUTH_TOKEN";

@Injectable()
export class AuthService {
  constructor(protected storageService: StorageService) {}

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  expectPermissions(permissions: Array<string>): boolean {
    const token: { access_token: string } = this.getToken();

    if (!token) return false;

    const tokenPayload: { permissions: Array<string> } = decode(
      token.access_token
    ) as any;

    return (
      this.isAuthenticated() &&
      tokenPayload.permissions &&
      permissions.some((p) =>
        (tokenPayload.permissions as Array<string>).some((tp) => p === tp)
      )
    );
  }

  getPermissions(): Array<string> {
    const token: { access_token: string } = this.getToken();

    if (!token) return [];

    const tokenPayload: { permissions: Array<string> } = decode(
        token.access_token
    ) as any;

    return tokenPayload.permissions;
  }

  protected getToken(): any {
    const token = this.storageService.getItem(AUTH_TOKEN);

    if (!token) return null;

    return JSON.parse(token) as any;
  }
}
