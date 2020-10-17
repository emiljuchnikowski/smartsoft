import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { Item } from "@smartsoft001/crud-domain";
import { DomainValidationError, IEntity } from "@smartsoft001/domain-core";
import { PermissionService } from "@smartsoft001/nestjs";
import {castModel, getInvalidFields} from "@smartsoft001/models";

import { UpdatePartialCommand } from "../../update-partial.command";

@CommandHandler(UpdatePartialCommand)
export class UpdatePartialHandler<T extends IEntity<string>>
  implements ICommandHandler<UpdatePartialCommand<T>> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly permissionService: PermissionService
  ) {}

  async execute(command: UpdatePartialCommand<T>): Promise<any> {
    try {
      const { id, item, user } = command;

      this.permissionService.valid("update", user);

      castModel(item, 'update');
      this.checkValid(item);
      const itemModel = this.publisher.mergeClassContext(Item);
      const entity = new itemModel(id);
      entity.updatePartial(item, command.user);
      entity.commit();
    } catch (e) {
      console.error(e);

      throw e;
    }
  }

  private checkValid(item: Partial<T>): void {
    const keys = Object.keys(item);
    const array = getInvalidFields(item, "update").filter((invalidField) =>
      keys.some((key) => key === invalidField)
    );

    if (array.length) {
      throw new DomainValidationError("Required fields: " + array.join(", "));
    }
  }
}
