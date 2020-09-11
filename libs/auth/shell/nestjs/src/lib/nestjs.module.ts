import {DynamicModule, Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';

import {TokenController} from "./controllers/token/token.controller";
import {DOMAIN_SERVICES, ENTITIES, TokenConfig} from "@smartsoft001/auth-domain";
import {AuthService} from "@smartsoft001/auth-shell-app-services";

@Module({ })
export class AuthShellNestjsModule {
    static forRoot(options: {
        tokenConfig: TokenConfig
    }): DynamicModule {
        return {
            module: AuthShellNestjsModule,
            controllers: [ TokenController ],
            providers: [
                AuthService,
                ...DOMAIN_SERVICES,
                { provide: TokenConfig, useValue: options.tokenConfig },
            ],
            imports: [
                TypeOrmModule.forFeature(ENTITIES),
                PassportModule.register({ defaultStrategy: 'jwt', session: false }),
                JwtModule.register({
                    secret: options.tokenConfig.secretOrPrivateKey,
                    signOptions: {
                        expiresIn: options.tokenConfig.expiredIn
                    }
                })
            ]
        }
    }
}

@Module({ })
export class AuthShellNestjsCoreModule {
    static forRoot(options: {
        tokenConfig: TokenConfig
    }): DynamicModule {
        return {
            module: AuthShellNestjsModule,
            providers: [
                AuthService,
                ...DOMAIN_SERVICES,
                { provide: TokenConfig, useValue: options.tokenConfig },
            ],
            exports: [
                AuthService,
                ...DOMAIN_SERVICES,
                { provide: TokenConfig, useValue: options.tokenConfig },
            ],
            imports: [
                TypeOrmModule.forFeature(ENTITIES),
                PassportModule.register({ defaultStrategy: 'jwt', session: false }),
                JwtModule.register({
                    secret: options.tokenConfig.secretOrPrivateKey,
                    signOptions: {
                        expiresIn: options.tokenConfig.expiredIn
                    }
                })
            ]
        }
    }
}
