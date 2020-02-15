import { AggregateRoot } from "@nestjs/cqrs";
import * as _ from "lodash";

import { IEntity } from "@smartsoft001/domain-core";
import { CreateItemEvent } from "../../feature-create-item/create-item.event";
import { IUser } from "@smartsoft001/users";
import { UpdateItemEvent } from "../../feature-update-item/update-item.event";
import { UpdatePartialItemEvent } from "../../feature-update-partial-item/update-partial-item.event";
import { DeleteItemEvent } from "../../feature-delete-item/delete-item.event";
import { CreateManyEvent } from "../../feature-create-many/create-many.event";

export class Item extends AggregateRoot implements IEntity<string> {
  id: string;

  constructor(itemOrId: IEntity<string> | string) {
    super();

    if (_.isObject(itemOrId)) {
      Object.keys(itemOrId).forEach(key => {
        this[key] = itemOrId[key];
      });
    } else {
      this.id = itemOrId as string;
    }
  }

  create(user: IUser): void {
    this.apply(new CreateItemEvent(this, user));
  }

  createMany(list: Array<Item>, user: IUser): void {
    this.apply(new CreateManyEvent(list, user));
  }

  update(user: IUser): void {
    this.apply(new UpdateItemEvent(this, user));
  }

  updatePartial(item: Partial<Item>, user): void {
    this.apply(new UpdatePartialItemEvent({ ...item, id: this.id }, user));
  }

  delete(user: IUser): void {
    this.apply(new DeleteItemEvent(this.id, user));
  }
}
