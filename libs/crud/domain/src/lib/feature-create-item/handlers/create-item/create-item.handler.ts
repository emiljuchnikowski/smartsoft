import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { CreateItemEvent } from "../../create-item.event";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";

@EventsHandler(CreateItemEvent)
export class CreateItemHandler<T extends IEntity<string>>
  implements IEventHandler<CreateItemEvent<T>> {
  constructor(private readonly repository: IItemRepository<T>) {}

  handle(event: CreateItemEvent<T>): any {
    return this.repository.create(event.item, event.user);
  }
}
