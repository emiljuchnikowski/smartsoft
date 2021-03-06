import {Injectable, NotFoundException} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {TransBaseService} from "../trans.service";
import {Trans} from "../entities";
import {ITransInternalService, ITransPaymentService} from "../interfaces";

@Injectable()
export class RefundService<T> extends TransBaseService<T> {
    constructor(
        @InjectRepository(Trans) repository: Repository<Trans<T>>
    ) {
        super(repository);
    }

    async refund(
        transId: string,
        internalService: ITransInternalService<T>,
        paymentService: ITransPaymentService,
        comment = "Refund"
    ) : Promise<void> {
        const trans: Trans<any> = await this.repository
            .findOne({
                _id: transId
            } as any);

        if (!trans) {
            throw new NotFoundException("Transaction not found: " + transId);
        }

        if (trans.status !== "completed") {
            throw new NotFoundException("Transaction is not completed/error: " + transId);
        }

        try {
            const data = await paymentService[trans.system].refund(trans, comment);

            trans.modifyDate = new Date();
            trans.status = "refund";
            data['customData'] = {
                comment
            };
            this.addHistory(trans, data);

            await this.repository.save(trans);
        } catch (err) {
            console.error(err);

            await this.setError(trans, err);

            throw err;
        }
    }
}