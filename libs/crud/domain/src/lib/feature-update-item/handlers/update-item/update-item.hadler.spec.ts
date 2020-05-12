import {Test, TestingModule} from "@nestjs/testing";

import {IItemRepository} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";
import {UpdateItemHandler} from "./update-item.handler";
import {UpdateItemEvent} from "../../update-item.event";
import {PasswordService} from "@smartsoft001/utils";

describe('crud-domain: UpdateItemHandler', () => {
    let handler: UpdateItemHandler<any>;
    let repository: IItemRepository<any>;

    beforeEach(async () => {
        repository = {
            create(): Promise<void> {
                return Promise.resolve();
            },
            createMany(): Promise<void> {
                return Promise.resolve();
            },
            update(): Promise<void> {
                return Promise.resolve();
            },
            updatePartial(): Promise<void> {
                return Promise.resolve();
            },
            delete(): Promise<void> {
                return Promise.resolve();
            },
            getById(): Promise<any> {
                return Promise.resolve(null)
            },
            getByCriteria(): Promise<{ data: any[]; totalCount: number }> {
                return Promise.resolve(null);
            },
            clear(user: IUser): Promise<void> {
                return Promise.resolve();
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: IItemRepository, useValue: repository },
                UpdateItemHandler
            ]
        }).compile();

        handler = module.get<UpdateItemHandler<any>>(UpdateItemHandler);
    });

    it("should be defined", () => {
        expect(handler).toBeDefined();
    });

    describe('handle()', () => {
        it('should handle event', () => {
            const event = new UpdateItemEvent({ id: 'test' }, {} as IUser);
            const spy = jest.spyOn(repository, 'update');

            handler.handle(event);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(event.item, event.user);
        });

        it("should hash password", async done => {
            const event = new UpdateItemEvent(
                { id: "test", password: "123" },
                {} as IUser
            );
            const spy = jest.spyOn(repository, "update");

            await handler.handle(event);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(
                { ...event.item, password: await PasswordService.hash("123") },
                event.user
            );

            done();
        });
    })
});
