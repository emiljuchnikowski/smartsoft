import {Body, Controller, Post, Res} from "@nestjs/common";
import { Response, Request } from "express";

import {StreamService} from "@smartsoft001/stream-shell-app-services";
import {IStreamCreate} from "@smartsoft001/stream-domain";

@Controller('')
export class StreamController {
    constructor(private service: StreamService) {
    }

    static getLink(req: Request): string {
        return req.protocol + "://" + req.headers.host + req.url;
    }

    @Post()
    async create(@Body() obj: IStreamCreate, @Res() res: Response): Promise<{ id: string }> {
        const id = await this.service.create(obj);
        res.set("Location", StreamController.getLink(res.req) + "/" + id);
        return res.send({
            id
        });
    }
}
