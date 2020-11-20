import { HttpService, Inject, Injectable, Optional } from "@nestjs/common";
import * as paypal from "paypal-rest-sdk";

import {
  ITransPaymentSingleService,
  Trans,
  TransStatus,
} from "@smartsoft001/trans-domain";

import {
  IPaypalConfigProvider,
  PAYPAL_CONFIG_PROVIDER,
  PaypalConfig,
} from "./paypal.config";

@Injectable()
export class PaypalService implements ITransPaymentSingleService {
  constructor(
    private readonly httpService: HttpService,
    private config: PaypalConfig,
    @Optional()
    @Inject(PAYPAL_CONFIG_PROVIDER)
    private configProvider: IPaypalConfigProvider
  ) { }

  async create(obj: {
    id: string;
    name: string;
    amount: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    contactPhone?: string;
    clientIp: string;
    data: any;
  }): Promise<{ orderId: string; redirectUrl: string }> {
    const config = await this.getConfig(obj.data);

    const data = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: config.apiUrl + "paypal/" + obj.id + "/confirm",
        cancel_url: config.cancelUrl,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: obj.name,
                sku: obj.id,
                price: obj.amount / 100,
                currency: config.currencyCode,
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: config.currencyCode,
            total: obj.amount / 100,
          },
          description: obj.name,
        },
      ],
    };

    const result: { id; links } = await new Promise((res, rej) => {
      paypal.payment.create(data, this.getEnv(config), function (error, payment) {
        if (error) {
          rej(error);
        } else {
          res(payment);
        }
      });
    });

    return {
      redirectUrl: result.links.find((l) => l.rel === "approval_url").href,
      orderId: result.id,
    };
  }

  async confirm(
    payerId: any,
    paymentId: any,
    amount: number,
    externalData: any
  ): Promise<any> {
    const config = await this.getConfig(externalData);

    const data = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: config.currencyCode,
            total: amount,
          },
        },
      ],
    };

    return await new Promise<void>((res, rej) => {
      paypal.payment.execute(paymentId, data, this.getEnv(config), (error, payment) => {
        if (error) {
          rej(error);
        } else {
          res(payment);
        }
      });
    });
  }

  async getStatus<T>(
    trans: Trans<T>
  ): Promise<{ status: TransStatus; data: any }> {
    const historyItem = trans.history.find((x) => x.status === "started");

    if (!historyItem) {
      console.warn("Transaction without start status");
      return null;
    }

    const orderId = historyItem.data.orderId;
    const config = await this.getConfig(trans.data);

    const payment: { state } = await new Promise((res, rej) => {
      paypal.payment.get(orderId, this.getEnv(config), (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      });
    });

    return {
      status: this.getStatusFromExternal(payment.state),
      data: payment,
    };
  }

  private getStatusFromExternal(status: string): any {
    status = status.toUpperCase();

    switch (status) {
      case "COMPLETED":
        return "completed";
      case "VOIDED":
        return "canceled";
      case "CREATED":
        return "pending";
      case "SAVED":
        return "pending";
      case "APPROVED":
        return "completed";
      default:
        return status;
    }
  }

  private async getConfig(data: any): Promise<PaypalConfig> {
    if (this.configProvider) return await this.configProvider.get(data);
    return this.config;
  }

  private getEnv(config: PaypalConfig): { mode, client_id, client_secret } {
    return {
      mode: config.test ? "sandbox" : "live",
      client_id: config.clientId,
      client_secret: config.clientSecret,
    };
  }
}
