import { Test, TestingModule } from '@nestjs/testing';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Guid} from "guid-typescript";

import { CrudService } from './crud.service';
import {IUser} from "@smartsoft001/users";
import {CreateCommand} from "@smartsoft001/crud-shell-app-services";
import {UpdateCommand} from "../../commands/update.command";
import {DeleteCommand} from "../../commands/delete.command";
import {UpdatePartialCommand} from "../../commands/update-partial.command";
import {GetByIdQuery} from "../../queries/get-by-id.query";
import {GetByCriteriaQuery} from "../../queries/get-by-criteria.query";

describe('crud-shared-app-services: CrudService', () => {
    let service: CrudService<any>;
    let commandBus;
    let queryBus;

    beforeEach(async () => {
        commandBus = {
            execute: () => Promise.resolve()
        };

        queryBus = {
            execute: () => Promise.resolve()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CrudService,
                { provide: CommandBus, useValue: commandBus },
                { provide: QueryBus, useValue: queryBus }
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

    describe('readById()', () => {
        it('should invoke query', async done => {
            const item = {};
            const spy = jest.spyOn(queryBus, 'execute').mockReturnValue(Promise.resolve(item));

            const result =  await service.readById('test', {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(new GetByIdQuery('test', {} as IUser));
            expect(result).toBe(item);

            done();
        });
    });

    describe('readByCriteria()', () => {
        it('should invoke query', async done => {
            const item = {};
            const spy = jest.spyOn(queryBus, 'execute').mockReturnValue(Promise.resolve({ data: [ item ], totalCount: 1 }));

            const result =  await service.read({ test: 2 }, { test: 1 }, {} as IUser);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(new GetByCriteriaQuery({ test: 2 }, { test: 1 }, {} as IUser));
            expect(result).toStrictEqual({ data: [ item ], totalCount: 1 });

            done();
        });
    });
});
