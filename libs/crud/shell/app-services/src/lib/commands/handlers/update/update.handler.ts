import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { Item } from "@smartsoft001/crud-domain";
import {DomainValidationError, IEntity} from "@smartsoft001/domain-core";
import { PermissionService } from "@smartsoft001/nestjs";
import { UpdateCommand } from "../../update.command";
import {castModel, getInvalidFields} from "@smartsoft001/models";

@CommandHandler(UpdateCommand)
export class UpdateHandler<T extends IEntity<string>>
  implements ICommandHandler<UpdateCommand<T>> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly permissionService: PermissionService
  ) {}

  async execute(command: UpdateCommand<T>): Promise<any> {
    try {
      const { item, user } = command;

      this.permissionService.valid("update", user);

      castModel(item, 'update');
      this.checkValid(item);
      const itemModel = this.publisher.mergeClassContext(Item);
      const entity = new itemModel(item);
      entity.update(command.user);
      entity.commit();
    } catch (e) {
      console.error(e);
    }
  }

  private checkValid(item: T): void {
    const array = getInvalidFields(item, "update");

    if (array.length) {
      throw new DomainValidationError("Required fields: " + array.join(", "));
    }
  }
}
