import {Trans, TransStatus} from "@smartsoft001/trans-domain";

export interface ITransInternalService<T> {
    create(trans: Trans<T>): Promise<any>;

    refresh(trans: Trans<any>): Promise<any>;
}

export interface ITransPaymentService {
    [key: string]: ITransPaymentSingleService;
}

export interface ITransPaymentSingleService {
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

    getStatus<T>(trans: Trans<T>): Promise<{ status: TransStatus, data: any }>;
}
