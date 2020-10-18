import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { Item } from "@smartsoft001/crud-domain";
import { DomainValidationError, IEntity } from "@smartsoft001/domain-core";
import { PermissionService } from "@smartsoft001/nestjs";
import { castModel, getInvalidFields } from "@smartsoft001/models";
import { ObjectService } from "@smartsoft001/utils";

import { CreateCommand } from "../../create.command";

@CommandHandler(CreateCommand)
export class CreateHandler<T extends IEntity<string>>
  implements ICommandHandler<CreateCommand<T>> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly permissionService: PermissionService
  ) {}

  async execute(command: CreateCommand<T>): Promise<any> {
    try {
      const { itemOrList, user } = command;

      this.permissionService.valid("create", user);

      const itemModel = this.publisher.mergeClassContext(Item);

      if (Array.isArray(itemOrList)) {
        (itemOrList as []).forEach((item) => {
          castModel(item, "create");
          this.checkValid(item);
        });

        const entity = new itemModel(null);
        entity.createMany(
          (itemOrList).map(
            (i) => ObjectService.removeTypes(i)
          ) as any[],
          command.user,
          command.options
        );
        entity.commit();
      } else {
        castModel(itemOrList, "create");
        this.checkValid(itemOrList);

        const entity = new itemModel(
          ObjectService.removeTypes(itemOrList) as IEntity<string>
        );
        entity.create(command.user);
        entity.commit();
      }
    } catch (e) {
      console.error(e);

      throw e;
    }
  }

  private checkValid(item: T): void {
    const array = getInvalidFields(item, "create");

    if (array.length) {
      throw new DomainValidationError("Required fields: " + array.join(", "));
    }
  }
}
