import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";

import {Item} from "@smartsoft001/crud-domain";
import {IEntity} from "@smartsoft001/domain-core";
import {PermissionService} from "@smartsoft001/nestjs";
import {UpdateCommand} from "../../update.command";

@CommandHandler(UpdateCommand)
export class UpdateHandler<T extends IEntity<string>> implements ICommandHandler<UpdateCommand<T>> {
    constructor(private readonly publisher: EventPublisher, private readonly permissionService: PermissionService) { }

    async execute(command: UpdateCommand<T>): Promise<any> {
        const { item, user } = command;

        this.permissionService.valid('update', user);

        const itemModel = this.publisher.mergeClassContext(Item);
        const entity = new itemModel(item);
        entity.update(command.user);
        entity.commit();
    }
}
