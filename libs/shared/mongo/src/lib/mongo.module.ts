import {DynamicModule} from "@nestjs/common";

import {MongoConfig} from "./mongo.config";
import {IItemRepository} from "@smartsoft001/domain-core";
import {MongoItemRepository} from "./repositories/item.repository";

export class MongoModule {
    static forRoot(config: MongoConfig): DynamicModule {
        return {
            module: MongoModule,
            providers: [
                { provide: MongoConfig, useValue: config },
                { provide: IItemRepository, useClass: MongoItemRepository }
            ],
            exports: [
                { provide: IItemRepository, useClass: MongoItemRepository }
            ]
        };
    }
}
