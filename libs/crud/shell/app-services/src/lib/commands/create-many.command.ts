import {IUser} from "@smartsoft001/users";
import {IEntity} from "@smartsoft001/domain-core";

export class CreateManyCommand<T extends IEntity<string>> {
    constructor(public list: T[], public user: IUser) { }
}
