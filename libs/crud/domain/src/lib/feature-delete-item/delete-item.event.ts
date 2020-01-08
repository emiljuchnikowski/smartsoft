import { IEvent } from "@nestjs/cqrs";

import { IUser } from "@smartsoft001/users";

export class DeleteItemEvent implements IEvent {
  constructor(public readonly id: string, public readonly user: IUser) {}
}
