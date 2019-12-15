export interface IAuthToken {
    access_token: string;
    refresh_token: string;
    expired_in: number;
    token_type: 'bearer';
}
