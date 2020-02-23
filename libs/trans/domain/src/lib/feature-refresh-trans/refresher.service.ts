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

  refresh(
    transId: string,
    internalService: ITransInternalService<T>,
    paymentService: ITransPaymentService
  ) {
    let trans: Trans<any>;

    // hack : bad map id
    return this.repository
      .findOne({
        _id: transId
      } as any)
      .then(res => {
        trans = res;

        if (!trans) {
          throw new NotFoundException("Nie ma takiej transakcji");
        }

        return paymentService[trans.system].getStatus(trans);
      })
        .then(({ status, data }) => {
          trans.status = status;
          this.addHistory(trans, data);

          return internalService.refresh(trans);
        })
        .then(res => {
          if (!res) return;

          this.addHistory(trans, res);

          return this.repository.save(trans);
        })
      .catch(err => {
        this.setError(trans, err);
        console.error(err);

        throw err;
      });
  }
}
