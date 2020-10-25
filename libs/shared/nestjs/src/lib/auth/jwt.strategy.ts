import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import {SharedConfig} from "../shared.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: SharedConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.tokenConfig.secretOrPrivateKey,
        });
    }

    async validate(payload: any) {
        return {
            ...payload,
            permissions: payload.permissions,
            username: payload.sub
        };
    }
}
