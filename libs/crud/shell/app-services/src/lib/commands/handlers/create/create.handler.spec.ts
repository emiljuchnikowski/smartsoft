import { Test, TestingModule } from "@nestjs/testing";
import { EventPublisher } from "@nestjs/cqrs";

import { CreateHandler } from "./create.handler";
import { PermissionService } from "@smartsoft001/nestjs";
import { Item } from "@smartsoft001/crud-domain";
import { CreateCommand } from "@smartsoft001/crud-shell-app-services";
import { IUser } from "@smartsoft001/users";

describe("crud-shared-app-services: CreateHandler", () => {
  let handler: CreateHandler<any>;
  let publisher;
  let permissionService;

  beforeEach(async () => {
    publisher = {
      mergeClassContext: () => Item
    };
    permissionService = {
      valid: () => {}
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHandler,
        { provide: EventPublisher, useValue: publisher },
        { provide: PermissionService, useValue: permissionService }
      ]
    }).compile();

    handler = module.get<CreateHandler<any>>(CreateHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  describe("execute()", () => {
    it("should check permissions", () => {
      const command = new CreateCommand({ id: "test" }, {} as IUser);
      const spy = jest.spyOn(permissionService, "valid");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("create", command.user);
    });

    it("should create aggregate root", () => {
      const command = new CreateCommand({ id: "test" }, {} as IUser);
      const spy = jest.spyOn(publisher, "mergeClassContext");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(Item);
    });
  });
});
