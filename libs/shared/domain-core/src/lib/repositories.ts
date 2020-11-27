import { Observable } from "rxjs";

import { IUser } from "@smartsoft001/users";
//import {ItemChangedData} from "@smartsoft001/crud-shell-dtos";

import { IEntity, ISpecification } from "./interfaces";

export interface ITransaction {
  connection: any;
};

export abstract class IUnitOfWork {
  abstract scope(definition: (transaction: ITransaction) => Promise<void>): Promise<void>;
}

export interface IItemRepositoryOptions {
  transaction: ITransaction;
}


export abstract class IItemRepository<T extends IEntity<string>> {
  abstract create(item: T, user: IUser, options?: IItemRepositoryOptions): Promise<void>;

  abstract createMany(list: T[], user: IUser, options?: IItemRepositoryOptions): Promise<void>;

  abstract update(item: T, user: IUser, options?: IItemRepositoryOptions): Promise<void>;

  abstract updatePartial(
    item: Partial<T> & { id: string },
    user: IUser
      , options?: IItemRepositoryOptions
  ): Promise<void>;

  abstract updatePartialManyByCriteria(
    criteria: any,
    set: Partial<T>,
    user: IUser, options?: IItemRepositoryOptions
  ): Promise<void>;

  abstract updatePartialManyBySpecification(
    spec: ISpecification,
    set: Partial<T>,
    user: IUser, options?: IItemRepositoryOptions
  ): Promise<void>;

  abstract delete(id: string, user: IUser, options?: IItemRepositoryOptions): Promise<void>;

  abstract getById(id: string): Promise<T>;

  abstract getByCriteria(
    criteria: any,
    options?: any
  ): Promise<{ data: T[]; totalCount: number }>;

  abstract getBySpecification(
    spec: ISpecification,
    options?: any
  ): Promise<{ data: T[]; totalCount: number }>;

  abstract async clear(user: IUser | IItemRepositoryOptions): Promise<void>;

  abstract changesByCriteria(criteria: { id?: string }): Observable<any>;
}
