export interface IAuthTokenRequest {
    grant_type: "password" | "refresh_token";
    username?: string;
    password?: string;
    refresh_token?: string;
    client_id?: string;
}
