import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";

import { IUser } from "@smartsoft001/users";
import {
  IEntity,
  IItemRepository,
  ISpecification,
} from "@smartsoft001/domain-core";
import { ICreateManyOptions } from "@smartsoft001/crud-domain";
import { ItemChangedData } from "@smartsoft001/crud-shell-dtos";

import { CreateCommand } from "../../commands/create.command";
import { UpdateCommand } from "../../commands/update.command";
import { DeleteCommand } from "../../commands/delete.command";
import { UpdatePartialCommand } from "../../commands/update-partial.command";
import { GetByIdQuery } from "../../queries/get-by-id.query";
import { GetByCriteriaQuery } from "../../queries/get-by-criteria.query";

@Injectable()
export class CrudService<T extends IEntity<string>> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly repository: IItemRepository<T>
  ) {}

  async create(data: T, user: IUser): Promise<string> {
    data.id = Guid.raw();

    await this.commandBus.execute(new CreateCommand(data, user));

    return data.id;
  }

  async createMany(
    data: T[],
    user: IUser,
    options: ICreateManyOptions
  ): Promise<T[]> {
    data.forEach((item) => {
      item.id = Guid.raw();
    });

    await this.commandBus.execute(new CreateCommand(data, user, options));

    return data;
  }

  readById(id: string, user: IUser): Promise<T> {
    return this.queryBus.execute(new GetByIdQuery(id, user));
  }

  read(
    criteria: any,
    options: any,
    user: IUser
  ): Promise<{ data: T[]; totalCount: number }> {
    return this.queryBus.execute(
      new GetByCriteriaQuery(criteria, options, user)
    );
  }

  readBySpec(
    spec: ISpecification,
    options: any,
    user: IUser
  ): Promise<{ data: T[]; totalCount: number }> {
    return this.queryBus.execute(
      new GetByCriteriaQuery(spec.criteria, options, user)
    );
  }

  async update(id: string, data: T, user: IUser): Promise<void> {
    await this.commandBus.execute(new UpdateCommand({ ...data, id }, user));
  }

  async updatePartial(
    id: string,
    data: Partial<T>,
    user: IUser
  ): Promise<void> {
    await this.commandBus.execute(new UpdatePartialCommand(id, data, user));
  }

  async delete(id: string, user: IUser): Promise<void> {
    await this.commandBus.execute(new DeleteCommand(id, user));
  }

  changes(criteria: { id?: string }): Observable<ItemChangedData> {
    return this.repository.changesByCriteria(criteria);
  }
}
