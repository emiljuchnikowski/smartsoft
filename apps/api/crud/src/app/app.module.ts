import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { CrudShellNestjsModule } from "@smartsoft001/crud-shell-nestjs";
import { AppExceptionFilter } from "@smartsoft001/nestjs";

const dbOptions = {
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  collection: process.env.DB_COLLECTION
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
 * - DB_ENTITY
 *
 * Optional node.js environment variables:
 * - PERMISSION_CREATE
 * - PERMISSION_READ
 * - PERMISSION_UPDATE
 * - PERMISSION_DELETE
 * - DB_USERNAME
 * - DB_PASSWORD
 * - URL_PREFIX
 */
@Module({
  imports: [
    CrudShellNestjsModule.forRoot({
      tokenConfig: {
        secretOrPrivateKey: process.env.TOKEN_CONFIG_SECRET_OR_PRIVATE_KEY,
        expiredIn: Number(process.env.TOKEN_CONFIG_EXPIRED_IN_SECONDS)
      },
      permissions: {
        create: process.env.PERMISSION_CREATE ? process.env.PERMISSION_CREATE.split(',') : null,
        read: process.env.PERMISSION_READ ? process.env.PERMISSION_READ.split(',') : null,
        update: process.env.PERMISSION_UPDATE ? process.env.PERMISSION_UPDATE.split(',') : null,
        delete: process.env.PERMISSION_DELETE ? process.env.PERMISSION_DELETE.split(',') : null
      },
      db: dbOptions
    })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ]
})
export class AppModule {}
