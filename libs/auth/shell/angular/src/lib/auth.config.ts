import {Injectable} from "@angular/core";

@Injectable()
export class AuthConfig {
    apiUrl: string;
    clientId: string;
    facebookId?: string;
}
