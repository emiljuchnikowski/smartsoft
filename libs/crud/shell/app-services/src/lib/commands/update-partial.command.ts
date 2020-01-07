import {IUser} from "@smartsoft001/users";
import {IEntity} from "@smartsoft001/domain-core";

export class UpdatePartialCommand<T extends IEntity<string>> {
    constructor(public id: string, public item: Partial<T>, public user: IUser) { }
}
