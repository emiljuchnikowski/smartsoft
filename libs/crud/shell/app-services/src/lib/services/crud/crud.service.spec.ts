import { Test, TestingModule } from '@nestjs/testing';
import {CommandBus} from "@nestjs/cqrs";
import {Guid} from "guid-typescript";

import { CrudService } from './crud.service';
import {IUser} from "@smartsoft001/users";
import {CreateCommand} from "@smartsoft001/crud-shell-app-services";
import {UpdateCommand} from "../../commands/update.command";
import {DeleteCommand} from "../../commands/delete.command";
import {UpdatePartialCommand} from "../../commands/update-partial.command";

describe('crud-shared-app-services: CrudService', () => {
    let service: CrudService<any>;
    let commandBus;

    beforeEach(async () => {
        commandBus = {
            execute: () => Promise.resolve()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CrudService,
                { provide: CommandBus, useValue: commandBus }
            ]
        }).compile();

        service = module.get<CrudService<any>>(CrudService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create()', () => {
        it('should create id', async done => {
            const model = { id: null };
            const spy = jest.spyOn(Guid, 'raw').mockReturnValue('test');

            const id = await service.create(model, {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(id).toBe('test');

            done();
        });

        it('should invoke command', async done => {
            const model = { id: null };
            const user = {} as IUser;
            const spy = jest.spyOn(commandBus, 'execute');

            await service.create(model, {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(new CreateCommand(model, user));

            done();
        });
    });

    describe('delete()', () => {
        it('should invoke command', async done => {
            const id = Guid.raw();
            const user = {} as IUser;
            const spy = jest.spyOn(commandBus, 'execute');

            await service.delete(id, {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(new DeleteCommand(id, user));

            done();
        });
    });

    describe('update()', () => {
        it('should invoke command', async done => {
            const id = Guid.raw();
            const model = { id: 'test', test: 123 };
            const user = {} as IUser;
            const spy = jest.spyOn(commandBus, 'execute');

            await service.update(id, model, {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(new UpdateCommand({ ...model, id: id }, user));

            done();
        });
    });

    describe('updatePartial()', () => {
        it('should invoke command', async done => {
            const id = Guid.raw();
            const model = { id: 'test', test: 123 };
            const user = {} as IUser;
            const spy = jest.spyOn(commandBus, 'execute');

            await service.updatePartial(id, model, {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(new UpdatePartialCommand(id, model, user));

            done();
        });
    });
});
