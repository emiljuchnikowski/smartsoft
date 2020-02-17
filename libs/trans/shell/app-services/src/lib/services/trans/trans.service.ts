import {HttpService, Injectable, Optional} from "@nestjs/common";

import {ITransCreate, Trans, TransConfig, TransCreatorService} from "@smartsoft001/trans-domain";
import {PayuService} from "@smartsoft001/payu";

@Injectable()
export class TransService {
    constructor(
        private creatorService: TransCreatorService<any>,
        private httpService: HttpService,
        private config: TransConfig,
        @Optional() private payuService: PayuService
    )
    { }

    create<T>(ops: ITransCreate<T>): Promise<string> {
        const internalService = {
            create: (trans: Trans<T>) => {
                return this.httpService.post(this.config.internalApiUrl, trans).toPromise().then(res => res.data);
            }
        };

        const paymentService = {
            'payu': this.payuService
        };

        return this.creatorService.create(ops, internalService, paymentService);
    }
}
