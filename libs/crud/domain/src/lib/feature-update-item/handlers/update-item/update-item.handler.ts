import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UpdateItemEvent } from "../../update-item.event";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";
import {PasswordService} from "@smartsoft001/utils";

@EventsHandler(UpdateItemEvent)
export class UpdateItemHandler<T extends IEntity<string>>
  implements IEventHandler<UpdateItemEvent<T>> {
  constructor(private readonly repository: IItemRepository<T>) {}

  async handle(event: UpdateItemEvent<T>): Promise<any> {
    if (event.item['password']) {
      event.item['password'] = await PasswordService.hash(event.item['password']);
    }
    return this.repository.update(event.item, event.user);
  }
}
