import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { Item } from "@smartsoft001/crud-domain";
import { PermissionService } from "@smartsoft001/nestjs";
import { DeleteCommand } from "../../delete.command";

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly permissionService: PermissionService
  ) {}

  async execute(command: DeleteCommand): Promise<any> {
    try {
      const { id, user } = command;

      this.permissionService.valid("delete", user);

      const itemModel = this.publisher.mergeClassContext(Item);
      const entity = new itemModel(id);
      entity.delete(command.user);
      entity.commit();
    } catch (e) {
      console.error(e);
    }
  }
}
