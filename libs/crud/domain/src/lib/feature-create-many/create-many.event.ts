import {IEvent} from "@nestjs/cqrs";

import {IEntity} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";

export class CreateManyEvent<T extends IEntity<string>> implements IEvent {
    constructor(public readonly list: T[], public readonly user: IUser) { }
}
