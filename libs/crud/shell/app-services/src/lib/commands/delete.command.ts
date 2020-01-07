import {IUser} from "@smartsoft001/users";

export class DeleteCommand {
    constructor(public id: string, public user: IUser) { }
}
