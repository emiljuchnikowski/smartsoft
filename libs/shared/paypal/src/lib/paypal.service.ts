import {HttpService, Injectable} from "@nestjs/common";

import {
  ITransPaymentSingleService,
  Trans,
  TransStatus,
} from "@smartsoft001/trans-domain";

import {PaypalConfig} from "./paypal.config";

@Injectable()
export class PaypalService implements ITransPaymentSingleService {
  constructor(private readonly httpService: HttpService, private config: PaypalConfig) {}

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

    const token = await this.getToken();

    const data = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: obj.id,
          amount: {
            value: obj.amount / 100,
            currency_code: this.config.currencyCode
          },
          soft_descriptor: obj.name
        }
      ],
      return_url: this.config.returnUrl,
      cancel_url: this.config.cancelUrl
    };

    if (obj.contactPhone || obj.email || obj.firstName || obj.lastName) {
      data['payer'] = {
        email_address: obj.email,
        phone: obj.contactPhone,
        name: obj.firstName + ' ' + obj.lastName
      }
    }

    const e = await this.httpService.post(this.getBaseUrl() + '/v2/checkout/orders', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }).toPromise();

    return {
      redirectUrl: e.data.links.find(l => l.rel === 'approve').href,
      orderId: e.data.id
    }
  }

  async getStatus<T>(trans: Trans<T>): Promise<{ status: TransStatus; data: any }> {
    const historyItem = trans.history.find(x => x.status === 'started');

    if (!historyItem) {
      console.warn('Transaction without start status');
      return null;
    }

    const orderId = historyItem.data.orderId;

    const token = await this.getToken();

    const response = await this.httpService.get(this.getBaseUrl() + '/v2/checkout/orders/' + orderId, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest"
      }
    }).toPromise();

    return {
      status: this.getStatusFromExternal(response.data.status),
      data: response.data
    }
  }

  private async  getToken(): Promise<string> {
    try {
      const response = await this.httpService.post(
          this.getBaseUrl(true) + '/v1/oauth2/token',
          `grant_type=client_credentials`
      ).toPromise();

      return response.data['access_token'];
    } catch (e) {
      console.error({
        url: this.getBaseUrl(true) + '/v1/oauth2/token',
        data: `grant_type=client_credentials`,
        ex: e
      });

      throw e;
    }
  }

  private getBaseUrl(auth?: boolean): string {
    let url = "https://";

    if (auth) {
      url += this.config.clientId + ':' + this.config.clientSecret + '@';
    }

    if (this.config.test) url += 'api.sandbox.paypal.com';
    else url += 'api.paypal.com';

    return url;
  }

  private getStatusFromExternal(status: string): any {
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
        return 'pending';
      default:
        return status;
    }
  }
}
