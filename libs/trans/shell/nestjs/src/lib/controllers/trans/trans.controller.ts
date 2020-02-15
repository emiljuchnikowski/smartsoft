import {Body, Controller, Post, Res} from "@nestjs/common";

import {ITransCreate} from "@smartsoft001/trans-domain";
import {TransService} from "@smartsoft001/trans-shell-app-services";

@Controller('')
export class TransController {
    constructor(private readonly service: TransService) {
    }

    @Post()
    async create<T>(@Body() obj: ITransCreate<T>, @Res() res) {
        const url = await this.service.create(obj);
        res.redirect('http://wp.pl');
    }
}
