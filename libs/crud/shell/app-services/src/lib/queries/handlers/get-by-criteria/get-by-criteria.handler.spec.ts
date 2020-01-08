import { Test, TestingModule } from "@nestjs/testing";

import { IItemRepository } from "@smartsoft001/domain-core";
import { GetByCriteriaHandler } from "./get-by-criteria.handler";
import { PermissionService } from "@smartsoft001/nestjs";
import { IUser } from "@smartsoft001/users";
import { GetByCriteriaQuery } from "../../get-by-criteria.query";

describe("crud-shared-app-services: GetByCriteriaHandler", () => {
  let handler: GetByCriteriaHandler<any>;
  let repository: Partial<IItemRepository<any>>;
  let permissionService;

  beforeEach(async () => {
    repository = {
      getByCriteria: () => Promise.resolve({ data: [], totalCount: 0 })
    };
    permissionService = {
      valid: () => {}
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByCriteriaHandler,
        { provide: IItemRepository, useValue: repository },
        { provide: PermissionService, useValue: permissionService }
      ]
    }).compile();

    handler = module.get<GetByCriteriaHandler<any>>(GetByCriteriaHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  describe("execute()", () => {
    it("should check permissions", () => {
      const query = new GetByCriteriaQuery({}, {}, {} as IUser);
      const spy = jest.spyOn(permissionService, "valid");

      handler.execute(query);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("read", query.user);
    });

    it("should get item from repository", async done => {
      const query = new GetByCriteriaQuery({}, {}, {} as IUser);
      const item = {};
      const spy = jest
        .spyOn(repository, "getByCriteria")
        .mockReturnValue(Promise.resolve({ data: [item], totalCount: 1 }));

      const result = await handler.execute(query);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({}, {});

      expect(result).toStrictEqual({ data: [item], totalCount: 1 });

      done();
    });
  });
});
