import { Test, TestingModule } from "@nestjs/testing";

import {GetByIdHandler} from "./get-by-id.handler";
import {IItemRepository} from "@smartsoft001/domain-core";
import {PermissionService} from "@smartsoft001/nestjs";
import {GetByIdQuery} from "../../get-by-id.query";
import {IUser} from "@smartsoft001/users";


describe("crud-shared-app-services: GetByIdHandler", () => {
    let handler: GetByIdHandler<any>;
    let repository: Partial<IItemRepository<any>>;
    let permissionService;

    beforeEach(async () => {
        repository = {
            getById: () => Promise.resolve({})
        };
        permissionService = {
            valid: () => {}
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetByIdHandler,
                { provide: IItemRepository, useValue: repository },
                { provide: PermissionService, useValue: permissionService }
            ]
        }).compile();

        handler = module.get<GetByIdHandler<any>>(GetByIdHandler);
    });

    it("should be defined", () => {
        expect(handler).toBeDefined();
    });

    describe("execute()", () => {
        it("should check permissions", () => {
            const query = new GetByIdQuery("test", {} as IUser);
            const spy = jest.spyOn(permissionService, "valid");

            handler.execute(query);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith("read", query.user);
        });

        it("should get item from repository", async () => {
            const query = new GetByIdQuery("test", {} as IUser);
            const item = {};
            const spy = jest.spyOn(repository, "getById").mockReturnValue(Promise.resolve(item));

            const result = await handler.execute(query);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith("test");

            expect(result).toBe(item);
        });
    });
});
