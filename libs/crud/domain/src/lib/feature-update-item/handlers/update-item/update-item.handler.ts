import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UpdateItemEvent } from "../../update-item.event";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";

@EventsHandler(UpdateItemEvent)
export class UpdateItemHandler<T extends IEntity<string>>
  implements IEventHandler<UpdateItemEvent<T>> {
  constructor(private readonly repository: IItemRepository<T>) {}

  handle(event: UpdateItemEvent<T>): any {
    return this.repository.update(event.item, event.user);
  }
}
