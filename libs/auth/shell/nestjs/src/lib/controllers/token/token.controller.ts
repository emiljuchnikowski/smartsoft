import {Body, Controller, Post} from '@nestjs/common';

import {AuthTokenRequestDto} from "../../dtos";
import {AuthService, IAuthToken} from "@smartsoft001/auth-shell-app-services";

@Controller('token')
export class TokenController {
    constructor(private service: AuthService) { }

    @Post()
    create(@Body() req: AuthTokenRequestDto): Promise<IAuthToken> {
        return this.service.create(req);
    }
}
