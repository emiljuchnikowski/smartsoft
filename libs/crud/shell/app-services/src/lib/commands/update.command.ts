import {IUser} from "@smartsoft001/users";
import {IEntity} from "@smartsoft001/domain-core";

export class UpdateCommand<T extends IEntity<string>> {
    constructor(public item: T, public user: IUser) { }
}
