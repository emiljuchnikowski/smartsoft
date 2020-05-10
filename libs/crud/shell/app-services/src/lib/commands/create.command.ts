import {IUser} from "@smartsoft001/users";
import {IEntity} from "@smartsoft001/domain-core";
import {ICreateManyOptions} from "@smartsoft001/crud-domain";

export class CreateCommand<T extends IEntity<string>> {
    constructor(public itemOrList: T | T[], public user: IUser, public options?: ICreateManyOptions, ) { }
}
