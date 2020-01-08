import {IUser} from "@smartsoft001/users";

export class GetByIdQuery {
    constructor(public id: string, public user: IUser) { }
}
