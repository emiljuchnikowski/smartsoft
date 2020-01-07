import {Injectable} from "@nestjs/common";

import {IEntity} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";

@Injectable()
export abstract class IItemRepository<T extends IEntity<string>> {
    abstract create(item: T, user: IUser): Promise<void>;
    abstract update(item: T, user: IUser): Promise<void>;
    abstract updatePartial(item: Partial<T> & { id: string }, user: IUser): Promise<void>;
    abstract delete(id: string, user: IUser): Promise<void>;
}
