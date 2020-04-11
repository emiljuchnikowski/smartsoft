import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { FilesApiModule } from "@smartsoft001/files-nestjs";
import { AppExceptionFilter } from "@smartsoft001/nestjs";

const dbOptions = {
    host: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
};

if (process.env.DB_USERNAME) {
    (dbOptions as any).username = process.env.DB_USERNAME;
    (dbOptions as any).password = process.env.DB_PASSWORD;
}

/**
 * Required node.js environment variables:
 * - DB_SERVER
 * - DB_PORT
 * - DB_NAME
 *
 * Optional node.js environment variables:
 * - DB_USERNAME
 * - DB_PASSWORD
 * - URL_PREFIX
 */
@Module({
  imports: [FilesApiModule.forRoot({
      db: dbOptions
  })],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ]
})
export class AppModule {}
