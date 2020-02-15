import {DynamicModule, Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";

import {CONTROLLERS} from "./controllers";
import {SERVICES} from "@smartsoft001/trans-shell-app-services";
import {DOMAIN_SERVICES} from "@smartsoft001/trans-domain";
import {ENTITIES} from "@smartsoft001/trans-domain";

@Module({ })
export class TransShellNestjsModule {
    static forRoot(options: {
        tokenConfig: {
            secretOrPrivateKey: string,
            expiredIn: number
        }
    }): DynamicModule {
        return {
            module: TransShellNestjsModule,
            controllers: CONTROLLERS,
            providers: [ ...SERVICES, ...DOMAIN_SERVICES ],
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
