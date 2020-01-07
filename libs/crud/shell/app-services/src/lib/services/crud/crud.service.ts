import { Injectable } from '@nestjs/common';
import {CommandBus} from "@nestjs/cqrs";
import {Guid} from "guid-typescript";

import {IUser} from "@smartsoft001/users";
import {IEntity} from "@smartsoft001/domain-core";
import {CreateCommand} from "../../commands";
import {UpdateCommand} from "../../commands/update.command";
import {DeleteCommand} from "../../commands/delete.command";
import {UpdatePartialCommand} from "../../commands/update-partial.command";

@Injectable()
export class CrudService<T extends IEntity<string>> {
    constructor(private readonly commandBus: CommandBus) {}

    async create(data: T, user: IUser): Promise<string> {
        data.id = Guid.raw();

        await this.commandBus.execute(new CreateCommand(data, user));

        return data.id;
    }

    readById(id: string, user: IUser): Promise<T> {
        return Promise.resolve(null);
    }

    read(user: IUser): Promise<T[]>  {
        return Promise.resolve(null);
    }

    async update(id: string, data: T, user: IUser): Promise<void> {
        await this.commandBus.execute(new UpdateCommand({ ...data, id }, user));
    }

    async updatePartial(id: string, data: Partial<T>, user: IUser): Promise<void> {
        await this.commandBus.execute(new UpdatePartialCommand(id, data, user));
    }

    async delete(id: string, user: IUser): Promise<void> {
        await this.commandBus.execute(new DeleteCommand(id, user));
    }
}
