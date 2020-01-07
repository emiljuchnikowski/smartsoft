import {Test, TestingModule} from "@nestjs/testing";

import {CreateItemHandler} from "./create-item.handler";
import {IItemRepository} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";
import {CreateItemEvent} from "../../create-item.event";

describe('crud-domain: CreateItemHandler', () => {
    let handler: CreateItemHandler<any>;
    let repository: IItemRepository<any>;

    beforeEach(async () => {
        repository = {
            create(): Promise<void> {
                return Promise.resolve()
            },
            update(): Promise<void> {
                return Promise.resolve()
            },
            updatePartial(): Promise<void> {
                return Promise.resolve()
            },
            delete(): Promise<void> {
                return Promise.resolve()
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: IItemRepository, useValue: repository },
                CreateItemHandler
            ]
        }).compile();

        handler = module.get<CreateItemHandler<any>>(CreateItemHandler);
    });

    it("should be defined", () => {
        expect(handler).toBeDefined();
    });

    describe('handle()', () => {
        it('should handle event', () => {
            const event = new CreateItemEvent({ id: 'test' }, {} as IUser);
            const spy = jest.spyOn(repository, 'create');

            handler.handle(event);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(event.item, event.user);
        });
    })
});
