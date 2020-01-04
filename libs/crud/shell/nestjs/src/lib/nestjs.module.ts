import {DynamicModule, Module} from "@nestjs/common";

import {CONTROLLERS} from "./controllers";

@Module({ })
export class CrudShellNestjsModule {
    static forRoot(): DynamicModule {
        return {
            module: CrudShellNestjsModule,
            controllers: CONTROLLERS,
            providers: [

            ],
            imports: [

            ]
        }
    }
}
