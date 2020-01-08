import { Test, TestingModule } from "@nestjs/testing";
import { EventPublisher } from "@nestjs/cqrs";

import { UpdatePartialHandler } from "./update-partial.handler";
import { PermissionService } from "@smartsoft001/nestjs";
import { Item } from "@smartsoft001/crud-domain";
import { IUser } from "@smartsoft001/users";
import {UpdatePartialCommand} from "../../update-partial.command";

describe("crud-shared-app-services: UpdatePartialHandler", () => {
  let handler: UpdatePartialHandler<any>;
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
        UpdatePartialHandler,
        { provide: EventPublisher, useValue: publisher },
        { provide: PermissionService, useValue: permissionService }
      ]
    }).compile();

    handler = module.get<UpdatePartialHandler<any>>(UpdatePartialHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  describe("execute()", () => {
    it("should check permissions", () => {
      const command = new UpdatePartialCommand('test', { test: "test" } as any, {} as IUser);
      const spy = jest.spyOn(permissionService, "valid");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("update", command.user);
    });

    it("should create aggregate root", () => {
      const command = new UpdatePartialCommand('test', { test: "test" } as any, {} as IUser);
      const spy = jest.spyOn(publisher, "mergeClassContext");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(Item);
    });
  });
});
