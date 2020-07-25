import { HttpService, Injectable, Optional } from "@nestjs/common";

import {
  ITransCreate,
  Trans,
  TransConfig,
  CreatorService,
  RefresherService,
  ITransPaymentSingleService,
} from "@smartsoft001/trans-domain";
import { PayuService } from "@smartsoft001/payu";
import { PaypalService } from "@smartsoft001/paypal";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TransService {
  private _paymentService: {
    [key: string]: ITransPaymentSingleService;
  } = {
    payu: this.payuService,
    paypal: this.paypalService
  };

  private _internalService = {
    create: (trans: Trans<any>) => {
      return this.httpService
        .post(this.config.internalApiUrl, trans)
        .toPromise()
        .then((res) => res.data);
    },

    refresh: (trans: Trans<any>) => {
      return this.httpService
        .put(this.config.internalApiUrl + "/" + trans.id, trans)
        .toPromise()
        .then((res) => res.data);
    },
  };

  constructor(
    private creatorService: CreatorService<any>,
    private refresherService: RefresherService<any>,
    private httpService: HttpService,
    private config: TransConfig,
    @InjectRepository(Trans) private repository: Repository<Trans<any>>,
    @Optional() private payuService: PayuService,
    @Optional() private paypalService: PaypalService
  ) {}

  create<T>(ops: ITransCreate<T>): Promise<string> {
    return this.creatorService.create(
      ops,
      this._internalService,
      this._paymentService
    );
  }

  async refresh(transId: string, data = {}): Promise<void> {
    await this.refresherService.refresh(
      transId,
      this._internalService,
      this._paymentService,
      data
    );
  }

  async getById(id: any): Promise<Trans<any>> {
    return await this.repository.findOne({
      _id: id
    } as any);
  }
}
