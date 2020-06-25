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

@Injectable()
export class TransService {
  private _paymentService: {
    [key: string]: ITransPaymentSingleService;
  } = {
    payu: this.payuService,
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
    @Optional() private payuService: PayuService
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
}
