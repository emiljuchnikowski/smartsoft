import {Injectable, Logger} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

import {
  AUTH_TOKEN_PAYLOAD_PROVIDER,
  AUTH_TOKEN_VALIDATION_PROVIDER,
  IAuthToken,
  IAuthTokenRequest,
  ITokenPayloadProvider,
  ITokenValidationProvider,
  TokenFactory,
} from "@smartsoft001/auth-domain";

@Injectable()
export class AuthService {
  constructor(
      private factory: TokenFactory,
      private moduleRef: ModuleRef
  ) {}

  create(req: IAuthTokenRequest): Promise<IAuthToken> {
    return this.factory.create({
      request: req,
      payloadProvider: this.getPayloadProvider(),
      validationProvider: this.getValidationProvider(),
    }) as Promise<IAuthToken>;
  }

  private getPayloadProvider(): ITokenPayloadProvider {
    try {
      return this.moduleRef.get(AUTH_TOKEN_PAYLOAD_PROVIDER, {
        strict: false,
      });
    } catch (e) {
      Logger.debug(e.message, AuthService.name);
    }
    return null;
  }

  private getValidationProvider(): ITokenValidationProvider {
    try {
      return this.moduleRef.get(AUTH_TOKEN_VALIDATION_PROVIDER, {
        strict: false,
      });
    } catch (e) {
      Logger.debug(e.message, AuthService.name);
    }
    return null;
  }
}
