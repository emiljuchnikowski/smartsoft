import {Test, TestingModule} from "@nestjs/testing";

import {IItemRepository} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";
import {UpdatePartialItemHandler} from "./update-item.handler";
import {UpdatePartialItemEvent} from "../../update-partial-item.event";

describe('crud-domain: UpdatePartialItemHandler', () => {
    let handler: UpdatePartialItemHandler<any>;
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
                UpdatePartialItemHandler
            ]
        }).compile();

        handler = module.get<UpdatePartialItemHandler<any>>(UpdatePartialItemHandler);
    });

    it("should be defined", () => {
        expect(handler).toBeDefined();
    });

    describe('handle()', () => {
        it('should handle event', () => {
            const event = new UpdatePartialItemEvent({ id: 'test' }, {} as IUser);
            const spy = jest.spyOn(repository, 'updatePartial');

            handler.handle(event);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(event.item, event.user);
        });
    })
});
