import { Module } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER } from "@nestjs/core";

import { ENTITIES } from "@smartsoft001/trans-domain";
import { AppExceptionFilter } from "@smartsoft001/nestjs";
import { TransShellNestjsModule } from "@smartsoft001-trans/shell-nestjs";
import { InternalController } from "./internal.controller";

const dbOptions: Partial<ConnectionOptions> = {
  type: "mongodb",
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  entities: ENTITIES,
  synchronize: false,
};

if (process.env.DB_USERNAME) {
  (dbOptions as any).username = process.env.DB_USERNAME;
  (dbOptions as any).password = process.env.DB_PASSWORD;
}

/**
 * Required node.js environment variables:
 * - TOKEN_CONFIG_SECRET_OR_PRIVATE_KEY
 * - TOKEN_CONFIG_EXPIRED_IN_SECONDS
 * - DB_SERVER
 * - DB_PORT
 * - DB_NAME
 * - INTERNAL_API_URL
 * - API_URL (required for paypal)
 *
 * Optional node.js environment variables:
 * - DB_USERNAME
 * - DB_PASSWORD
 * - URL_PREFIX
 * - PAYU_CLIENT_ID
 * - PAYU_CLIENT_SECRET
 * - PAYU_POST_ID
 * - PAYU_NOTIFY_URL
 * - PAYU_CONTINUE_URL
 * - PAYU_TEST
 * - PAYPAL_CLIENT_ID
 * - PAYPAL_CLIENT_SECRET
 * - PAYPAL_CURRENCY_CODE
 * - PAYPAL_RETURN_URL
 * - PAYPAL_CANCEL_URL
 * - PAYPAL_TEST
 * - REVOLUT_TOKEN
 * - REVOLUT_TEST
 * - TEST
 */

@Module({
  imports: [
    TransShellNestjsModule.forRoot({
      internalApiUrl: process.env.INTERNAL_API_URL,
      tokenConfig: {
        secretOrPrivateKey: process.env.TOKEN_CONFIG_SECRET_OR_PRIVATE_KEY,
        expiredIn: Number(process.env.TOKEN_CONFIG_EXPIRED_IN_SECONDS),
      },
      payuConfig: process.env.PAYU_CLIENT_ID
        ? {
            clientId: process.env.PAYU_CLIENT_ID,
            clientSecret: process.env.PAYU_CLIENT_SECRET,
            posId: process.env.PAYU_POST_ID,
            notifyUrl: process.env.PAYU_NOTIFY_URL,
            continueUrl: process.env.PAYU_CONTINUE_URL,
            test: process.env.PAYU_TEST === "1" || process.env.TEST === "1",
          }
        : null,
      paypalConfig: process.env.PAYPAL_CLIENT_ID
        ? {
            apiUrl: process.env.API_URL,
            clientId: process.env.PAYPAL_CLIENT_ID,
            clientSecret: process.env.PAYPAL_CLIENT_SECRET,
            currencyCode: process.env.PAYPAL_CURRENCY_CODE,
            returnUrl: process.env.PAYPAL_RETURN_URL,
            cancelUrl: process.env.PAYPAL_CANCEL_URL,
            test: process.env.PAYPAL_TEST === "1" || process.env.TEST === "1",
          }
        : null,
      revolutConfig: process.env.REVOLUT_TOKEN
        ? {
            token: process.env.REVOLUT_TOKEN,
            test: process.env.REVOLUT_TEST === "1" || process.env.TEST === "1",
          }
        : null,
    }),
    TypeOrmModule.forRoot(dbOptions),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
  controllers: [InternalController],
})
export class AppModule {}
