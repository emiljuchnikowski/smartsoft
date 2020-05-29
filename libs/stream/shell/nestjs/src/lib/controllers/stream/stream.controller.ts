import {Body, Controller, Post} from "@nestjs/common";

import {StreamService} from "@smartsoft001/stream-shell-app-services";
import {IStreamCreate} from "@smartsoft001/stream-domain";

@Controller('')
export class StreamController {
    constructor(private service: StreamService) {
    }

    @Post()
    async create(@Body() obj: IStreamCreate): Promise<{ id: string }> {
        const id = await this.service.create(obj);
        return { id };
    }
}
