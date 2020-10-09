import { DynamicModule, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";

import {
  COMMAND_HANDLERS,
  QUERY_HANDLERS,
  SERVICES,
} from "@smartsoft001/crud-shell-app-services";
import { SharedConfig, SharedModule } from "@smartsoft001/nestjs";
import { DOMAIN_HANDLERS } from "@smartsoft001/crud-domain";
import { MongoModule } from "@smartsoft001/mongo";

import { CONTROLLERS } from "./controllers";
import { AuthJwtGuard } from "./guards/auth/auth.guard";
import { GATEWAYS } from "./gateways";

@Module({})
export class CrudShellNestjsModule {
  static forRoot(
    options: SharedConfig & {
      db: {
        host: string;
        port: number;
        database: string;
        username?: string;
        password?: string;
        collection?: string;
      };
    } & {
      restApi: boolean;
      socket: boolean;
    }
  ): DynamicModule {
    return {
      module: CrudShellNestjsModule,
      controllers: options.restApi ? CONTROLLERS : [],
      providers: [
        ...SERVICES,
        ...COMMAND_HANDLERS,
        ...DOMAIN_HANDLERS,
        ...QUERY_HANDLERS,
        ...(options.socket ? GATEWAYS : []),
        AuthJwtGuard,
      ],
      imports: [
        ...(options.restApi
          ? [
              PassportModule.register({
                defaultStrategy: "jwt",
                session: false,
              }),
              JwtModule.register({
                secret: options.tokenConfig.secretOrPrivateKey,
                signOptions: {
                  expiresIn: options.tokenConfig.expiredIn,
                },
              }),
            ]
          : []),
        SharedModule.forRoot(options),
        MongoModule.forRoot(options.db),
        CqrsModule,
      ],
      exports: [
        ...SERVICES,
        ...COMMAND_HANDLERS,
        ...DOMAIN_HANDLERS,
        ...QUERY_HANDLERS,
        AuthJwtGuard,
        MongoModule.forRoot(options.db)
      ],
    };
  }
}

@Module({})
export class CrudShellNestjsCoreModule {
  static forRoot(
    options: SharedConfig & {
      db: {
        host: string;
        port: number;
        database: string;
        username?: string;
        password?: string;
        collection?: string;
      };
    }
  ): DynamicModule {
    return {
      module: CrudShellNestjsModule,
      providers: [
        ...SERVICES,
        ...COMMAND_HANDLERS,
        ...DOMAIN_HANDLERS,
        ...QUERY_HANDLERS,
        ...GATEWAYS,
        AuthJwtGuard,
      ],
      imports: [
        PassportModule.register({ defaultStrategy: "jwt", session: false }),
        JwtModule.register({
          secret: options.tokenConfig.secretOrPrivateKey,
          signOptions: {
            expiresIn: options.tokenConfig.expiredIn,
          },
        }),
        SharedModule.forRoot(options),
        MongoModule.forRoot(options.db),
        CqrsModule,
      ],
      exports: [],
    };
  }
}
