import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { IEntity, IItemRepository } from "@smartsoft001/domain-core";
import { UpdatePartialItemEvent } from "../../update-partial-item.event";
import { PasswordService } from "@smartsoft001/utils";

@EventsHandler(UpdatePartialItemEvent)
export class UpdatePartialItemHandler<T extends IEntity<string>>
  implements IEventHandler<UpdatePartialItemEvent<T>> {
  constructor(private readonly repository: IItemRepository<T>) {}

  async handle(event: UpdatePartialItemEvent<T>): Promise<any> {
    if (event.item["password"]) {
      event.item["password"] = await PasswordService.hash(
        event.item["password"]
      );
    }
    return this.repository.updatePartial(event.item, event.user);
  }
}
