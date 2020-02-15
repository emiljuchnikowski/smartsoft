import {Injectable} from "@nestjs/common";
import {Guid} from "guid-typescript";

import {ITransCreate} from "./interfaces";
import {DomainValidationError} from "@smartsoft001/domain-core";
import {Trans, TRANS_SYSTEMS, TransHistory} from "../entities/trans.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TransCreatorService<T> {
    constructor(@InjectRepository(Trans) private repository: Repository<Trans<T>>,) {
    }

    async create(config: ITransCreate<T>): Promise<string> {
        this.valid(config);

        const trans = this.prepare(config);

        try {
            await this.repository.insert(trans);
        } catch (e) {
            console.error(e);
        }

        return null;
    }

    private prepare(config: ITransCreate<T>): Trans<T> {
        const trans = new Trans<T>();

        trans.id = Guid.raw();
        trans.amount = config.amount;
        trans.data = config.data;
        trans.modifyDate = new Date();
        trans.status = 'prepare';
        trans.system = config.system;

        this.addHistory(trans, trans.data);

        return trans;
    }

    private addHistory(trans: Trans<T>, data: any): void {
        const historyItem = new TransHistory<T>();
        historyItem.id = Guid.raw();
        historyItem.amount = trans.amount;
        historyItem.modifyDate = trans.modifyDate;
        historyItem.data = data;
        historyItem.system = trans.system;
        historyItem.status = trans.status;
        if (!trans.history) trans.history = [];
        trans.history.push(historyItem);
    }

    private valid(req: ITransCreate<T>) {
        if (!req) throw new DomainValidationError("config is empty");

        if (!req.amount || req.amount < 1) throw new DomainValidationError("amount is empty");
        if (!req.data) throw new DomainValidationError("data is empty");
        if (!req.system || !TRANS_SYSTEMS.some(s => s === req.system))
            throw new DomainValidationError("system is empty");
    }
}
