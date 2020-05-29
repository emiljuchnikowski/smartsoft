import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import {
  DOMAIN_SERVICES,
  ENTITIES,
  StreamConfig
} from "@smartsoft001/stream-domain";
import { SERVICES } from "@smartsoft001/stream-shell-app-services";

import { CONTROLLERS } from "./controllers";

@Module({})
export class StreamShellNestjsModule {
  static forRoot(config: StreamConfig): DynamicModule {
    return {
      module: StreamShellNestjsModule,
      controllers: CONTROLLERS,
      providers: [
        ...SERVICES,
        ...DOMAIN_SERVICES,
        { provide: StreamConfig, useValue: config }
      ],
      imports: [
        TypeOrmModule.forFeature(ENTITIES),
        PassportModule.register({ defaultStrategy: "jwt", session: false }),
        JwtModule.register({
          secret: config.tokenConfig.secretOrPrivateKey,
          signOptions: {
            expiresIn: config.tokenConfig.expiredIn
          }
        })
      ]
    };
  }
}
