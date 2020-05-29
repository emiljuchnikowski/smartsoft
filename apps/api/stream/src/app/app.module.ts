import { Module } from '@nestjs/common';
import {ConnectionOptions} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";

import {ENTITIES} from "@smartsoft001/stream-domain";

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
 *
 * Optional node.js environment variables:
 * - DB_USERNAME
 * - DB_PASSWORD
 */

@Module({
  imports: [
    TypeOrmModule.forRoot(dbOptions)
  ]
})
export class AppModule {}
