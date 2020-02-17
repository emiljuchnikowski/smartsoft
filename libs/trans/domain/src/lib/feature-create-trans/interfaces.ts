import {Trans, TransSystem} from "../entities/trans.entity";

export interface ITransCreate<T> {
    amount: number;
    name: string;
    system: TransSystem;
    firstName: string;
    lastName: string;
    email: string;
    contactPhone: string;
    data: T;
    clientIp: string;
}

export interface ITransCreateInternalService<T> {
    create(trans: Trans<T>): Promise<any>;
}

export interface ITransCreatePaymentService {
    [key: string]: ITransCreatePaymentSingleService;
}

export interface ITransCreatePaymentSingleService {
    create(obj: {
        id: string,
        name: string,
        amount: number,
        firstName?: string,
        lastName?: string,
        email?: string,
        contactPhone?: string,
        clientIp: string
    }): Promise<{ orderId: string, redirectUrl: string }>;
}
