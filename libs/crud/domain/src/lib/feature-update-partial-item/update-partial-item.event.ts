import { IEntity } from "@smartsoft001/domain-core";
import { IUser } from "@smartsoft001/users";

export class UpdatePartialItemEvent<T extends IEntity<string>> {
  constructor(
    public readonly item: Partial<T> & { id: string },
    public readonly user: IUser
  ) {}
}
