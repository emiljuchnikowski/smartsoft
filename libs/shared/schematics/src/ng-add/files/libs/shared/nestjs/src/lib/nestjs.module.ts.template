import { DynamicModule, Module } from "@nestjs/common";
import { SharedConfig, SharedModule } from "@smartsoft001/nestjs";
import { CrudShellNestjsModule } from "@smartsoft001/crud-shell-nestjs";
import { CqrsModule } from "@nestjs/cqrs";

import { CONTROLLERS } from "./controllers";
import { SERVICES } from "./services";

@Module({
    controllers: [],
    providers: [],
    exports: [],
})
export class SharedNestjsModule {
    static forRoot(
        options: SharedConfig & {
            db: {
                host: string;
                port: number;
                database: string;
                username?: string;
                password?: string;
            };
            restApi?: boolean;
        }
    ): DynamicModule {
        return {
            module: SharedNestjsModule,
            controllers: options.restApi ? CONTROLLERS : [],
            providers: [...SERVICES],
            imports: [
                SharedModule.forRoot(options),
                CrudShellNestjsModule.forRoot({
                    ...options,
                    permissions: {
                        create: ["admin"],
                        update: ["admin"],
                        delete: ["admin"],
                    },
                    db: {
                        ...options.db,
                        collection: "configs",
                    },
                    restApi: false,
                    socket: false,
                }),
                CqrsModule,
            ],
            exports: [...SERVICES],
        };
    }
}