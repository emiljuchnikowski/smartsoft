import {IsNotEmpty} from "class-validator";

import {IAuthTokenRequest} from "@smartsoft001/auth-shell-app-services";

export class AuthTokenRequestDto implements IAuthTokenRequest {
    client_id?: string;
    @IsNotEmpty()
    grant_type: "password" | "refresh_token";
    password?: string;
    refresh_token?: string;
    username?: string;
}
