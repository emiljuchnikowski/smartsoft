import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(AuthJwtGuard.name, true);

    handleRequest(err: any, user: any, info: any): any {
        if (err || !user) {
            this.logger.warn(JSON.stringify(info));
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
