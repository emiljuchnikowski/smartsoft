import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Trans, TransHistory} from "./entities/trans.entity";

export abstract class TransBaseService<T> {
    protected constructor(
        @InjectRepository(Trans) protected repository: Repository<Trans<T>>
    ) {
    }

    protected addHistory(trans: Trans<T>, data: any): void {
        const historyItem = new TransHistory<T>();
        historyItem.amount = trans.amount;
        historyItem.modifyDate = trans.modifyDate;
        historyItem.data = data;
        historyItem.system = trans.system;
        historyItem.status = trans.status;
        if (!trans.history) trans.history = [];
        trans.history.push(historyItem);
    }

    protected async setError(trans: Trans<T>, error): Promise<void> {
        trans.modifyDate = new Date();
        trans.status = "error";
        this.addHistory(trans, error);

        await this.repository.save(trans as any);
    }
}

