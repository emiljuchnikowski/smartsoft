import { Injectable } from "@nestjs/common";

import {
  ITransPaymentSingleService,
  Trans,
  TransStatus,
} from "@smartsoft001/trans-domain";

@Injectable()
export class PaypalService implements ITransPaymentSingleService {
  create(obj: {
    id: string;
    name: string;
    amount: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    contactPhone?: string;
    clientIp: string;
  }): Promise<{ orderId: string; redirectUrl: string }> {
    return Promise.resolve({ orderId: "", redirectUrl: "" });
  }

  getStatus<T>(trans: Trans<T>): Promise<{ status: TransStatus; data: any }> {
    return Promise.resolve({ data: undefined, status: undefined });
  }
}
