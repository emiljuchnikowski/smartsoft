import {IUser} from "@smartsoft001/users";
import { IEntity } from './interfaces';

export abstract class IItemRepository<T extends IEntity<string>> {
    abstract create(item: T, user: IUser): Promise<void>;

    abstract update(item: T, user: IUser): Promise<void>;

    abstract updatePartial(item: Partial<T> & { id: string }, user: IUser): Promise<void>;

    abstract delete(id: string, user: IUser): Promise<void>;

    abstract getById(id: string): Promise<T>;

    abstract getByCriteria(criteria: any, options: any): Promise<{ data: T[], totalCount: number }>;
}
