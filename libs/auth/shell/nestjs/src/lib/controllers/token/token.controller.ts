import {Body, Controller, Post} from '@nestjs/common';

import {AuthService} from "@smartsoft001/auth-shell-app-services";
import {IAuthToken, IAuthTokenRequest} from "@smartsoft001/auth-domain";

@Controller('token')
export class TokenController {
    constructor(private readonly service: AuthService) { }

    @Post()
    create(@Body() req: IAuthTokenRequest): Promise<IAuthToken> {
        return this.service.create(req);
    }
}
