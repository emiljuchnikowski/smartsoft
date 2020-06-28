import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { TransService } from "@smartsoft001/trans-shell-app-services";

@Controller("paypal")
export class PaypalController {
  constructor(private readonly service: TransService) {}

  @Post()
  @HttpCode(200)
  async refreshStatus(
    @Body() obj: { txn_id: string }
  ): Promise<string> {
    try {
      await this.service.refresh(obj.txn_id, obj);
      return "ok";
    } catch (e) {
      console.error('ERROR ---> ', obj);
      console.error(e);
      throw e;
    }
  }
}
