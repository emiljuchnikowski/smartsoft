import {TransSystem} from "../entities/trans.entity";

export interface ITransCreate<T> {
    amount: number;
    system: TransSystem;
    data: T;
}
