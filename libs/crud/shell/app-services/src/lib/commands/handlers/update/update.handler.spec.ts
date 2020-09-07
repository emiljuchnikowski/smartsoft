import { Test, TestingModule } from "@nestjs/testing";
import { EventPublisher } from "@nestjs/cqrs";

import { UpdateHandler } from "./update.handler";
import { PermissionService } from "@smartsoft001/nestjs";
import { Item } from "@smartsoft001/crud-domain";
import { IUser } from "@smartsoft001/users";
import {UpdateCommand} from "../../update.command";
import {service} from "@nrwl/nest/src/schematics/nestjs-schematics/nestjs-schematics";

describe("crud-shared-app-services: UpdateHandler", () => {
  let handler: UpdateHandler<any>;
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
        UpdateHandler,
        { provide: EventPublisher, useValue: publisher },
        { provide: PermissionService, useValue: permissionService }
      ]
    }).compile();

    handler = module.get<UpdateHandler<any>>(UpdateHandler);
    permissionService = module.get<PermissionService>(PermissionService);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
    expect(permissionService).toBeDefined();
  });

  describe("execute()", () => {
    it("should check permissions", () => {
      const command = new UpdateCommand({ id: "test" }, {} as IUser);
      const spy = jest.spyOn(permissionService, "valid");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("update", command.user);
    });

    it("should create aggregate root", () => {
      const command = new UpdateCommand({ id: "test" }, {} as IUser);
      const spy = jest.spyOn(publisher, "mergeClassContext");

      handler.execute(command);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(Item);
    });
  });
});
