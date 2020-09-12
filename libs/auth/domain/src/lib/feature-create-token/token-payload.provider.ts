import { IAuthTokenRequest } from "./interfaces";
import { User } from "../entities";

export const AUTH_TOKEN_PAYLOAD_PROVIDER = "AUTH_TOKEN_PAYLOAD_PROVIDER";

export abstract class ITokenPayloadProvider {
  abstract change(
    basePayload,
    data: {
      request?: IAuthTokenRequest;
      user?: User;
    }
  ): Promise<void>;
}
