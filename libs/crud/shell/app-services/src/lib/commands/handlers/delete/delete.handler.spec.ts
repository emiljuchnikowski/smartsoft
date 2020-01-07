import { Test, TestingModule } from "@nestjs/testing";
import { EventPublisher } from "@nestjs/cqrs";

import { PermissionService } from "@smartsoft001/nestjs";
import { Item } from "@smartsoft001/crud-domain";
import { IUser } from "@smartsoft001/users";
import {DeleteHandler} from "./delete.handler";
import {DeleteCommand} from "../../delete.command";

describe("crud-shared-app-services: DeleteHandler", () => {
  let handler: DeleteHandler;
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
        DeleteHandler,
        { provide: EventPublisher, useValue: publisher },
        { provide: PermissionService, useValue: permissionService }
      ]
    }).compile();

    handler = module.get<DeleteHandler>(DeleteHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  describe("execute()", () => {
    it("should check permissions", () => {
      const command = new DeleteCommand("test", {} as IUser);
      const spy = jest.spyOn(permissionService, "valid");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("delete", command.user);
    });

    it("should create aggregate root", () => {
      const command = new DeleteCommand("test", {} as IUser);
      const spy = jest.spyOn(publisher, "mergeClassContext");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(Item);
    });
  });
});
