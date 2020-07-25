import {HttpService, Injectable} from "@nestjs/common";
import * as paypal from 'paypal-rest-sdk';

import {
  ITransPaymentSingleService,
  Trans,
  TransStatus,
} from "@smartsoft001/trans-domain";

import {PaypalConfig} from "./paypal.config";

@Injectable()
export class PaypalService implements ITransPaymentSingleService {
  constructor(private readonly httpService: HttpService, private config: PaypalConfig) {
    paypal.configure({
      'mode': this.config.test ? 'sandbox' : 'live',
      'client_id': this.config.clientId,
      'client_secret': this.config.clientSecret
    });
  }

  async create(obj: {
    id: string;
    name: string;
    amount: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    contactPhone?: string;
    clientIp: string;
  }): Promise<{ orderId: string; redirectUrl: string }> {

    const data = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": this.config.apiUrl + 'paypal/' + obj.id + '/confirm',
        "cancel_url": this.config.cancelUrl
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": obj.name,
            "sku": obj.id,
            "price": obj.amount / 100,
            "currency": this.config.currencyCode,
            "quantity": 1
          }]
        },
        "amount": {
          "currency": this.config.currencyCode,
          "total": obj.amount / 100
        },
        "description": obj.name
      }]
    }

    const result: { id, links } = await new Promise((res, rej) => {
      paypal.payment.create(data, function (error, payment) {
        if (error) {
          rej(error);
        } else {
          res(payment);
        }
      });
    });

    return {
      redirectUrl: result.links.find(l => l.rel === 'approval_url').href,
      orderId: result.id
    }
  }

  async confirm(payerId: any, paymentId: any, amount: number): Promise<any> {
    const data = {
      "payer_id": payerId,
      "transactions": [
        {
          "amount": {
            "currency": this.config.currencyCode,
            "total": amount
          }
        }
      ]
    };

    return await new Promise<void>((res, rej) => {
      paypal.payment.execute(paymentId, data, (error, payment) => {
        if (error) {
          rej(error);
        } else {
          res(payment);
        }
      });
    });
  }

  async getStatus<T>(trans: Trans<T>): Promise<{ status: TransStatus; data: any }> {
    const historyItem = trans.history.find(x => x.status === 'started');

    if (!historyItem) {
      console.warn('Transaction without start status');
      return null;
    }

    const orderId = historyItem.data.orderId;

    const payment: { state } = await new Promise((res, rej) => {
      paypal.payment.get(orderId, (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      });
    });

    return {
      status: this.getStatusFromExternal(payment.state),
      data: payment
    }
  }

  private getStatusFromExternal(status: string): any {
    status = status.toUpperCase();

    switch (status) {
      case 'COMPLETED':
        return 'completed';
      case 'VOIDED':
        return 'canceled';
      case 'CREATED':
        return 'pending';
      case 'SAVED':
        return 'pending';
      case 'APPROVED':
        return 'completed';
      default:
        return status;
    }
  }
}
