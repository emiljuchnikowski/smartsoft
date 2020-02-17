import {Body, Controller, Post, Req} from "@nestjs/common";

import {ITransCreate} from "@smartsoft001/trans-domain";
import {TransService} from "@smartsoft001/trans-shell-app-services";

@Controller('')
export class TransController {
    constructor(private readonly service: TransService) {
    }

    @Post()
    async create<T>(@Body() obj: ITransCreate<T>, @Req() req) {
        obj.clientIp = req.connection.remoteAddress;
        const url = await this.service.create(obj);
        return {
            url
        }
    }
}
