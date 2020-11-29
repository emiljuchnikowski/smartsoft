import {TransController} from "./trans/trans.controller";
import {PayUController} from "./payu/payu.controller";
import {PaypalController} from "./paypal/paypal.controller";

export * from "./trans/trans.controller";
export * from "./payu/payu.controller";
export * from "./paypal/paypal.controller";

export const CONTROLLERS = [
    TransController,
    PayUController,
    PaypalController
];
