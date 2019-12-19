import {Injectable} from "@nestjs/common";

import {IAuthToken, IAuthTokenRequest, TokenFactory} from "@smartsoft001/auth-domain";

@Injectable()
export class AuthService {
    constructor(private factory: TokenFactory) { }

    create(req: IAuthTokenRequest): Promise<IAuthToken> {
        return this.factory.create(req) as Promise<IAuthToken>;
    }
}
