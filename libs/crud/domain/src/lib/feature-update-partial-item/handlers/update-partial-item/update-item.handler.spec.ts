import { Test, TestingModule } from "@nestjs/testing";

import { IItemRepository } from "@smartsoft001/domain-core";
import { IUser } from "@smartsoft001/users";
import { UpdatePartialItemHandler } from "./update-item.handler";
import { UpdatePartialItemEvent } from "../../update-partial-item.event";
import { PasswordService } from "@smartsoft001/utils";
import {Observable, of} from "rxjs";
import {ItemChangedData} from "@smartsoft001/crud-shell-dtos";

describe("crud-domain: UpdatePartialItemHandler", () => {
  let handler: UpdatePartialItemHandler<any>;
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
      },
      changesByCriteria(criteria: { id?: string }): Observable<ItemChangedData> {
        return of(null)
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IItemRepository, useValue: repository },
        UpdatePartialItemHandler
      ]
    }).compile();

    handler = module.get<UpdatePartialItemHandler<any>>(
      UpdatePartialItemHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  describe("handle()", () => {
    it("should handle event", () => {
      const event = new UpdatePartialItemEvent({ id: "test" }, {} as IUser);
      const spy = jest.spyOn(repository, "updatePartial");

      handler.handle(event);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(event.item, event.user);
    });

    it("should hash password", async () => {
      const event = new UpdatePartialItemEvent(
        { id: "test", password: "123" },
        {} as IUser
      );
      const spy = jest.spyOn(repository, "updatePartial");

      await handler.handle(event);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        { ...event.item, password: await PasswordService.hash("123") },
        event.user
      );
    });
  });
});
