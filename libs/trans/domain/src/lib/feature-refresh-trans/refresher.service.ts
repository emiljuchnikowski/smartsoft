import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { TransBaseService } from "../trans.service";
import { ITransInternalService, ITransPaymentService } from "../interfaces";
import { Trans } from "../entities";

@Injectable()
export class RefresherService<T> extends TransBaseService<T> {
  constructor(
    @InjectRepository(Trans) repository: Repository<Trans<T>>
  ) {
    super(repository);
  }

  async refresh(
    transId: string,
    internalService: ITransInternalService<T>,
    paymentService: ITransPaymentService,
    customData = {}
  ) : Promise<void> {

    // hack : bad map id
    const trans: Trans<any> = await this.repository
        .findOne({
          externalId: transId
        });

    if (!trans) {
      throw new NotFoundException("Transaction not found: " + transId);
    }

    try {
      const { status, data } = await paymentService[trans.system].getStatus(trans);

      if (status === trans.status) return;

      trans.modifyDate = new Date();
      trans.status = status;
      data['customData'] = customData;
      this.addHistory(trans, data);

      const internalRes = await internalService.refresh(trans);

      if (!internalRes) return;

      this.addHistory(trans, internalRes);

      await this.repository.save(trans);
    } catch (err) {
      console.error(err);

      await this.setError(trans, err);

      throw err;
    }
  }
}
