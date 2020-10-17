import {DynamicModule} from "@nestjs/common";

import {JwtStrategy} from "./auth/jwt.strategy";
import {SharedConfig} from "./shared.config";
import {PermissionService} from "./auth/permission.service";


export class SharedModule {
    static forRoot(config: SharedConfig): DynamicModule {
        return {
            module: SharedModule,
            providers: [
                { provide: SharedConfig, useValue: config },
                JwtStrategy, PermissionService
            ],
            exports: [
                { provide: SharedConfig, useValue: config },
                PermissionService, JwtStrategy
            ]
        }
    }
}
