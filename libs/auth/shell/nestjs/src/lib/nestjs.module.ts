import {DynamicModule, Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';

import {CONTROLLERS} from "./controllers";
import {DOMAIN_SERVICES, ENTITIES, TokenConfig} from "@smartsoft001/auth-domain";
import {SERVICES} from "@smartsoft001/auth-shell-app-services";

@Module({ })
export class AuthShellNestjsModule {
    static forRoot(options: {
        tokenConfig: TokenConfig
    }): DynamicModule {
        return {
            module: AuthShellNestjsModule,
            controllers: CONTROLLERS,
            providers: [
                ...SERVICES,
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
