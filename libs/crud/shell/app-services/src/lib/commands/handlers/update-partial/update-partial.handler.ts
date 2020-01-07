import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";

import {Item} from "@smartsoft001/crud-domain";
import {IEntity} from "@smartsoft001/domain-core";
import {PermissionService} from "@smartsoft001/nestjs";
import {UpdatePartialCommand} from "../../update-partial.command";

@CommandHandler(UpdatePartialCommand)
export class UpdatePartialHandler<T extends IEntity<string>> implements ICommandHandler<UpdatePartialCommand<T>> {
    constructor(private readonly publisher: EventPublisher, private readonly permissionService: PermissionService) { }

    async execute(command: UpdatePartialCommand<T>): Promise<any> {
        const { id, item, user } = command;

        this.permissionService.valid('update', user);

        const itemModel = this.publisher.mergeClassContext(Item);
        const entity = new itemModel(id);
        entity.updatePartial(item, command.user);
        entity.commit();
    }
}
