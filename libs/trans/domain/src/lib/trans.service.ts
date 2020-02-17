import {Trans, TransHistory} from "./entities/trans.entity";

export abstract class TransBaseService<T> {
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
}

