export class PaypalConfig {
    clientId: string;
    clientSecret: string;
    currencyCode: string;
    returnUrl: string;
    apiUrl: string;
    cancelUrl: string;
    test?: boolean;
}

export const PAYPAL_CONFIG_PROVIDER = "PAYPAL_CONFIG_PROVIDER";

export abstract class IPaypalConfigProvider {
    abstract get(data: any): Promise<PaypalConfig>;
}
