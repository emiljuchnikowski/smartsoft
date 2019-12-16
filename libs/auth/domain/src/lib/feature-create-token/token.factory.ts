import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";

import {DomainValidationError, IFactory} from "@smartsoft001/shared-domain-core";
import {IAuthToken, IAuthTokenRequest, User} from "@smartsoft001/auth-domain";
import {TokenConfig} from "./token.config";

@Injectable()
export class TokenFactory implements IFactory<IAuthToken, IAuthTokenRequest> {
    constructor(private config: TokenConfig, private repository: Repository<User>) { }

    create(config: NonNullable<IAuthTokenRequest>): Promise<IAuthToken> {
        this.valid(config);

        //this.repository.

        return null;
    }

    private valid(req: NonNullable<IAuthTokenRequest>): void {
        if (!req) throw new DomainValidationError('config is empty');
        if (!req.grant_type) throw new DomainValidationError('grant_type is empty');

        // password
        if (req.grant_type === 'password') {
            if (!req.username)
                throw new DomainValidationError('username is empty');
            if (!req.password)
                throw new DomainValidationError('password is empty');
            if (!req.client_id)
                throw new DomainValidationError('client_id is empty');
            if (!this.config.clients.some(c => c === req.client_id))
                throw new DomainValidationError('client_id is incorrect');
        } else if (req.grant_type === 'refresh_token') {
            if (!req.refresh_token)
                throw new DomainValidationError('refresh_token is empty');
        } else {
            throw new DomainValidationError('grant_type is incorrect');
        }

    }

}
