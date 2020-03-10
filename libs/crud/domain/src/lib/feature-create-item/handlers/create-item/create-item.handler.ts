import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { CreateItemEvent } from "../../create-item.event";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";
import {PasswordService} from "@smartsoft001/utils";

@EventsHandler(CreateItemEvent)
export class CreateItemHandler<T extends IEntity<string>>
  implements IEventHandler<CreateItemEvent<T>> {
  constructor(private readonly repository: IItemRepository<T>) {}

  async handle(event: CreateItemEvent<T>): Promise<any> {
    if (event.item['password']) {
      event.item['password'] = await PasswordService.hash(event.item['password']);
    }
    if(event.item['passwordConfirm']) {
      delete event.item['passwordConfirm'];
    }
    return this.repository.create(event.item, event.user);
  }
}
