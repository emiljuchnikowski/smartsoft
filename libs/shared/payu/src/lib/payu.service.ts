import {HttpService, Injectable} from "@nestjs/common";

import { ITransCreatePaymentSingleService } from "@smartsoft001/trans-domain";
import {PayuConfig} from "./payu.config";

@Injectable()
export class PayuService implements ITransCreatePaymentSingleService {
  constructor(private readonly httpService: HttpService, private config: PayuConfig) {}

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
      "customerIp": obj.clientIp,
      "merchantPosId": this.config.posId,
      "description": obj.name,
      "currencyCode": "PLN",
      "totalAmount": obj.amount,
      "products": [
        {
          "name": obj.name,
          "unitPrice": obj.amount,
          "quantity": "1"
        }
      ]
    };

    if (obj.contactPhone || obj.email || obj.firstName || obj.lastName) {
      data['buyer'] = {
        email: obj.email,
        phone: obj.contactPhone,
        firstName: obj.firstName,
        lastName: obj.lastName
      }
    }

    try {
      await this.httpService.post(this.getBaseUrl() + '/api/v2_1/orders', data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          'X-Requested-With': "XMLHttpRequest"
        },
        maxRedirects: 0
      }).toPromise();

      return null;
    } catch (e) {
      if (e.response && e.response.status === 302) {
        return {
          redirectUrl: e.response.data.redirectUri,
          orderId: e.response.data.orderId
        }
      }
      console.error(e);
      throw e;
    }
  }

  private async  getToken(): Promise<string> {
    const response = await this.httpService.post(
        this.getBaseUrl() + '/pl/standard/user/oauth/authorize',
        `grant_type=client_credentials&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}`
    ).toPromise();

    return response.data['access_token'];
  }

  private getBaseUrl(): string {
    if (this.config.test) return 'https://secure.snd.payu.com';

    return 'https://secure.payu.com'
  }
}
