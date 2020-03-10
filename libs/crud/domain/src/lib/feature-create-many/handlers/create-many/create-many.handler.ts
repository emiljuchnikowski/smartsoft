import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { CreateManyEvent } from "../../create-many.event";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";
import {PasswordService} from "@smartsoft001/utils";

@EventsHandler(CreateManyEvent)
export class CreateManyHandler<T extends IEntity<string>>
  implements IEventHandler<CreateManyEvent<T>> {
  constructor(private readonly repository: IItemRepository<T>) {}

  async handle(event: CreateManyEvent<T>): Promise<any> {
    for (let index = 0; index < event.list.length; index++) {
      const item = event.list[index];

      if (item['password']) {
        item['password'] = await PasswordService.hash(item['password']);
      }

      if(item['passwordConfirm']) {
        delete item['passwordConfirm'];
      }
    }

    return this.repository.createMany(event.list, event.user);
  }
}
