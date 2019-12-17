import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import { JwtService } from '@nestjs/jwt';

import {DomainValidationError, IFactory} from "@smartsoft001/shared-domain-core";
import {IAuthToken, IAuthTokenRequest, User} from "@smartsoft001/auth-domain";
import {TokenConfig} from "./token.config";
import {PasswordService} from "@smartsoft001/shared-utils";
import {Guid} from "guid-typescript";

@Injectable()
export class TokenFactory implements IFactory<IAuthToken, IAuthTokenRequest> {
    private _invalidUsernameOrPasswordMessage = "Invalid username or password";

    constructor(private config: TokenConfig, private repository: Repository<User>, private jwtService: JwtService) { }

    async create(config: NonNullable<IAuthTokenRequest>): Promise<IAuthToken> {
        this.valid(config);

        const query = this.getQuery(config);
        const user = await this.repository.findOne(query);

        this.checkUser(config, user);
        await this.checkPassword(config, user);

        const refreshToken = Guid.raw();
        await this.repository.update(query, {
            authRefreshToken: refreshToken
        });


        // TODO: correct jwt token
        return {
            expired_in: this.config.expiredIn,
            token_type: 'bearer',
            access_token: this.jwtService.sign({
                roles: user.roles
            }, {
                expiresIn: this.config.expiredIn,
                subject: user.username,

            }),
            refresh_token: refreshToken
        };
    }

    private checkUser(config: IAuthTokenRequest, user: User): void {
        if (!user)
            throw new DomainValidationError(config.grant_type === "password"
                ? this._invalidUsernameOrPasswordMessage
                : 'Invalid token'
            );
    }

    private async checkPassword(config: IAuthTokenRequest, user: User): Promise<void> {
        if (config.grant_type === "password" && !(await PasswordService.compare(config.password, user.password)))
            throw new DomainValidationError(this._invalidUsernameOrPasswordMessage);
    }

    private getQuery(config: IAuthTokenRequest): Partial<User> {
      return (config.grant_type === "password")
          ? { username: config.username }
          : { authRefreshToken: config.refresh_token };
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
