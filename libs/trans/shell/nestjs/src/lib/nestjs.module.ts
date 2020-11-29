import { DynamicModule, HttpModule, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SERVICES } from "@smartsoft001/trans-shell-app-services";
import { DOMAIN_SERVICES, TransConfig } from "@smartsoft001/trans-domain";
import { ENTITIES } from "@smartsoft001/trans-domain";
import { PayuConfig, PayuService } from "@smartsoft001/payu";
import { PaypalConfig, PaypalService } from "@smartsoft001/paypal";

import { CONTROLLERS } from "./controllers";

@Module({
  imports: [HttpModule],
})
export class TransShellNestjsModule {
  static forRoot(
    config: TransConfig & {
      payuConfig?: PayuConfig;
      paypalConfig?: PaypalConfig;
    }
  ): DynamicModule {
    return {
      module: TransShellNestjsModule,
      controllers: CONTROLLERS,
      providers: [
        ...SERVICES,
        ...DOMAIN_SERVICES,
        { provide: TransConfig, useValue: config },
        ...(config.payuConfig
          ? [{ provide: PayuConfig, useValue: config.payuConfig }, PayuService]
          : []),
        ...(config.paypalConfig
          ? [
              { provide: PaypalConfig, useValue: config.paypalConfig },
              PaypalService,
            ]
          : []),
      ],
      imports: [
        TypeOrmModule.forFeature(ENTITIES),
        PassportModule.register({ defaultStrategy: "jwt", session: false }),
        JwtModule.register({
          secret: config.tokenConfig.secretOrPrivateKey,
          signOptions: {
            expiresIn: config.tokenConfig.expiredIn,
          },
        }),
      ],
      exports: [...SERVICES],
    };
  }
}

@Module({
  imports: [HttpModule],
})
export class TransShellNestjsCoreModule {
  static forRoot(
    config: TransConfig & {
      payuConfig?: PayuConfig;
      paypalConfig?: PaypalConfig;
    }
  ): DynamicModule {
    return {
      module: TransShellNestjsCoreModule,
      providers: [
        ...SERVICES,
        ...DOMAIN_SERVICES,
        { provide: TransConfig, useValue: config },
        ...(config.payuConfig
          ? [{ provide: PayuConfig, useValue: config.payuConfig }, PayuService]
          : []),
        ...(config.paypalConfig
          ? [
              { provide: PaypalConfig, useValue: config.paypalConfig },
              PaypalService,
            ]
          : []),
      ],
      imports: [
        TypeOrmModule.forFeature(ENTITIES),
        PassportModule.register({ defaultStrategy: "jwt", session: false }),
        JwtModule.register({
          secret: config.tokenConfig.secretOrPrivateKey,
          signOptions: {
            expiresIn: config.tokenConfig.expiredIn,
          },
        }),
      ],
      exports: [...SERVICES],
    };
  }
}
