import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";

import {CreateCommand} from "../../create.command";
import {Item} from "@smartsoft001/crud-domain";
import {IEntity} from "@smartsoft001/domain-core";
import {PermissionService} from "@smartsoft001/nestjs";

@CommandHandler(CreateCommand)
export class CreateHandler<T extends IEntity<string>> implements ICommandHandler<CreateCommand<T>> {
    constructor(private readonly publisher: EventPublisher, private readonly permissionService: PermissionService) { }

    async execute(command: CreateCommand<T>): Promise<any> {
        const { itemOrList, user } = command;

        this.permissionService.valid('create', user);

        const itemModel = this.publisher.mergeClassContext(Item);

        if (Array.isArray(itemOrList)) {
            const entity = new itemModel(null);
            entity.createMany(itemOrList as any[], command.user);
            entity.commit();
        } else {
            const entity = new itemModel(itemOrList);
            entity.create(command.user);
            entity.commit();
        }
    }
}
