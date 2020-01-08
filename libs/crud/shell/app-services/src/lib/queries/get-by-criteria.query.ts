import { IUser } from "@smartsoft001/users";

export class GetByCriteriaQuery {
  constructor(public criteria: any, public options: any, public user: IUser) {}
}
