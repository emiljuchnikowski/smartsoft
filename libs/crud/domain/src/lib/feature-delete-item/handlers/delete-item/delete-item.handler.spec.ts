import {Test, TestingModule} from "@nestjs/testing";

import {IItemRepository} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";
import {DeleteItemHandler} from "./delete-item.handler";
import {DeleteItemEvent} from "../../delete-item.event";

describe('crud-domain: DeleteItemHandler', () => {
    let handler: DeleteItemHandler;
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
                DeleteItemHandler
            ]
        }).compile();

        handler = module.get<DeleteItemHandler>(DeleteItemHandler);
    });

    it("should be defined", () => {
        expect(handler).toBeDefined();
    });

    describe('handle()', () => {
        it('should handle event', () => {
            const event = new DeleteItemEvent('test', {} as IUser);
            const spy = jest.spyOn(repository, 'delete');

            handler.handle(event);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(event.id, event.user);
        });
    })
});
