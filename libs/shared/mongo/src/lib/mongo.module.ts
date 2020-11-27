import {DynamicModule} from "@nestjs/common";

import {IItemRepository, IUnitOfWork} from "@smartsoft001/domain-core";

import {MongoConfig} from "./mongo.config";
import {MongoItemRepository} from "./repositories/item.repository";
import {MongoUnitOfWork} from "./mongo.unitofwork";

export class MongoModule {
    static forRoot(config: MongoConfig): DynamicModule {
        return {
            module: MongoModule,
            providers: [
                { provide: MongoConfig, useValue: config },
                { provide: IItemRepository, useClass: MongoItemRepository },
                { provide: IUnitOfWork, useClass: MongoUnitOfWork }
            ],
            exports: [
                { provide: IItemRepository, useClass: MongoItemRepository },
                { provide: IUnitOfWork, useClass: MongoUnitOfWork }
            ]
        };
    }
}
