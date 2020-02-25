import { Module } from '@nestjs/common';
import {ConnectionOptions} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_FILTER} from "@nestjs/core";

import {ENTITIES} from "@smartsoft001/trans-domain";
import {AppExceptionFilter} from "@smartsoft001/nestjs";
import {TransShellNestjsModule} from "@smartsoft001-trans/shell-nestjs";
import {InternalController} from "./internal.controller";

const dbOptions: Partial<ConnectionOptions> = {
  type: "mongodb",
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  entities: ENTITIES,
  synchronize: false
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
 *
 * Optional node.js environment variables:
 * - DB_USERNAME
 * - DB_PASSWORD
 * - URL_PREFIX
 * - PAYU_CLIENT_ID
 * - PAYU_CLIENT_SECRET
 * - PAYU_POST_ID
 * - PAYU_NOTIFY_URL
 * - PAYU_TEST
 */

@Module({
  imports: [
    TransShellNestjsModule.forRoot({
      internalApiUrl: process.env.INTERNAL_API_URL,
      tokenConfig: {
        secretOrPrivateKey: process.env.TOKEN_CONFIG_SECRET_OR_PRIVATE_KEY,
        expiredIn: Number(process.env.TOKEN_CONFIG_EXPIRED_IN_SECONDS)
      },
      payuConfig: process.env.PAYU_CLIENT_ID ? {
        clientId: process.env.PAYU_CLIENT_ID,
        clientSecret: process.env.PAYU_CLIENT_SECRET,
        posId: process.env.PAYU_POST_ID,
        notifyUrl: process.env.PAYU_NOTIFY_URL,
        test: !!process.env.PAYU_TEST,
      } : null
    }),
    TypeOrmModule.forRoot(dbOptions)
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ],
  controllers: [
      InternalController
  ]
})
export class AppModule {}
