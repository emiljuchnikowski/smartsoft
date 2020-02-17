import { Injectable } from "@nestjs/common";

import {
  ITransCreate,
  ITransCreateInternalService,
  ITransCreatePaymentService
} from "./interfaces";
import { DomainValidationError } from "@smartsoft001/domain-core";
import { Trans, TRANS_SYSTEMS, TransHistory } from "../entities/trans.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransBaseService } from "../trans.service";

@Injectable()
export class TransCreatorService<T> extends TransBaseService<T> {
  constructor(
    @InjectRepository(Trans) private repository: Repository<Trans<T>>
  ) {
    super();
  }

  async create(
    config: ITransCreate<T>,
    internalService: ITransCreateInternalService<T>,
    paymentService: ITransCreatePaymentService
  ): Promise<string> {
    this.valid(config);

    const trans = await this.prepare(config);

    try {
      await this.setAsNew(trans, internalService);

      return await this.setAsStarted(trans, paymentService);
    } catch (e) {
      await this.setError(trans, e);
      console.error(e);
      throw e;
    }

    return null;
  }

  private async setAsStarted(
    trans: Trans<T>,
    paymentService: ITransCreatePaymentService
  ): Promise<string> {
    const paymentResult = await paymentService[trans.system].create({
      id: trans.id.toString(),
      name: trans.name,
      amount: trans.amount,
      firstName: trans.firstName,
      lastName: trans.lastName,
      email: trans.email,
      contactPhone: trans.contactPhone,
      clientIp: trans.clientIp
    });
    trans.status = "started";
    trans.modifyDate = new Date();
    this.addHistory(trans, paymentResult);

    await this.repository.save(trans as any);

    return paymentResult.redirectUrl;
  }

  private async setAsNew(
    trans: Trans<T>,
    internalService: ITransCreateInternalService<T>
  ): Promise<void> {
    const internalResult = await internalService.create(trans);
    trans.status = "new";
    trans.modifyDate = new Date();
    this.addHistory(trans, internalResult);

    await this.repository.save(trans as any);
  }

  private async prepare(config: ITransCreate<T>): Promise<Trans<T>> {
    const trans = new Trans<T>();

    Object.keys(config).forEach(key => {
      trans[key] = config[key];
    });

    trans.modifyDate = new Date();
    trans.status = "prepare";

    this.addHistory(trans, trans.data);

    await this.repository.save(trans as any);

    return trans;
  }

  private async setError(trans: Trans<T>, error): Promise<void> {
    trans.modifyDate = new Date();
    trans.status = "error";
    this.addHistory(trans, error);

    await this.repository.save(trans as any);
  }

  private valid(req: ITransCreate<T>) {
    if (!req) throw new DomainValidationError("config is empty");

    if (!req.name) throw new DomainValidationError("name is empty");
    if (!req.clientIp) throw new DomainValidationError("client ip is empty");
    if (!req.amount || req.amount < 1)
      throw new DomainValidationError("amount is empty");
    if (!req.data) throw new DomainValidationError("data is empty");
    if (!req.system || !TRANS_SYSTEMS.some(s => s === req.system))
      throw new DomainValidationError("system is empty");
  }
}
