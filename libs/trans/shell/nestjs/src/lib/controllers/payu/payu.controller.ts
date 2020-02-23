import {Body, Controller, Post} from "@nestjs/common";

import {TransService} from "@smartsoft001/trans-shell-app-services";

@Controller('payu')
export class PayUController {
    constructor(private readonly service: TransService) {
    }

    @Post()
    async refreshStatus(@Body() obj: { order: { orderId: string } }): Promise<string> {
        await this.service.refresh(obj.order.orderId);
        return 'ok';
    }
}
