import { Injectable } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error) {
        // don't throw 401 error when unauthenticated
        console.log('Test', err, user, info);
        return user;
    }
}
