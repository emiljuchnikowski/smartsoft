import {Injectable, Logger} from "@nestjs/common";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";

import { IUser } from "@smartsoft001/users";
import {
  DomainValidationError,
  IEntity,
  IItemRepository,
  ISpecification,
} from "@smartsoft001/domain-core";
import {ICreateManyOptions} from "@smartsoft001/crud-domain";
import { ItemChangedData } from "@smartsoft001/crud-shell-dtos";
import {PermissionService} from "@smartsoft001/nestjs";
import {castModel, getInvalidFields, isModel} from "@smartsoft001/models";
import {PasswordService} from "@smartsoft001/utils";

@Injectable()
export class CrudService<T extends IEntity<string>> {
  private _logger = new Logger(CrudService.name, true);

  constructor(
      private readonly permissionService: PermissionService,
      private readonly repository: IItemRepository<T>
  ) {}

  async create(data: T, user: IUser): Promise<string> {
    data.id = Guid.raw();

    try {
      this.permissionService.valid("create", user);

      castModel(data, "create", user.permissions);
      this.checkValidCreate(data, user.permissions);

      if (data['password']) {
        data['password'] = await PasswordService.hash(data['password']);
      }
      if(data['passwordConfirm']) {
        delete data['passwordConfirm'];
      }
      await this.repository.create(data, user);

      return data.id;
    } catch (e) {
      this._logger.error(e);
      throw e;
    }
  }

  async createMany(
    data: T[],
    user: IUser,
    options: ICreateManyOptions
  ): Promise<T[]> {
    data.forEach((item) => {
      item.id = Guid.raw();
    });

    try {
      this.permissionService.valid("create", user);

      data.forEach((item) => {
        castModel(item, "create", user.permissions);
        this.checkValidCreate(item, user.permissions);
      });

      if (options && options.mode === 'replace') {
        await this.repository.clear(user);
      }

      for (let index = 0; index < data.length; index++) {
        const item = data[index];

        if (item['password']) {
          item['password'] = await PasswordService.hash(item['password']);
        }

        if(item['passwordConfirm']) {
          delete item['passwordConfirm'];
        }
      }

      await this.repository.createMany(data, user);
    } catch (e) {
      this._logger.error(e);
      throw e;
    }

    return data;
  }

  async readById(id: string, user: IUser): Promise<T> {
    try {
      this.permissionService.valid("read", user);
      const result = await this.repository.getById(id);
      delete result['password'];

      return result;
    } catch (e) {
      this._logger.error(e);
      throw e;
    }
  }

  async read(
    criteria: any,
    options: any,
    user: IUser
  ): Promise<{ data: T[]; totalCount: number }> {
    try {
      this.permissionService.valid("read", user);
      const result = await this.repository.getByCriteria(criteria, options);
      result.data.forEach(item => delete item['password']);

      return result;
    } catch (e) {
      this._logger.error(e);
      throw e;
    }
  }

  readBySpec(
    spec: ISpecification,
    options: any,
    user: IUser
  ): Promise<{ data: T[]; totalCount: number }> {
    return this.read(spec.criteria, options, user);
  }

  async update(id: string, data: T, user: IUser): Promise<void> {
    try {
      data.id = id;
      this.permissionService.valid("update", user);

      castModel(data, 'update', user.permissions);
      this.checkValidUpdate(data, user.permissions);

      if (data['password']) {
        data['password'] = await PasswordService.hash(data['password']);
      }
      if(data['passwordConfirm']) {
        delete data['passwordConfirm'];
      }
      await this.repository.update(data, user);
    } catch (e) {
      this._logger.error(e);
      throw e;
    }
  }

  async updatePartial(
    id: string,
    data: Partial<T>,
    user: IUser
  ): Promise<void> {
    try {
      data.id = id;

      this.permissionService.valid("update", user);

      castModel(data, 'update', user.permissions);
      this.checkValidUpdatePartial(data, user.permissions);

      if (data["password"]) {
        data["password"] = await PasswordService.hash(
            data["password"]
        );
      }
      if(data['passwordConfirm']) {
        delete data['passwordConfirm'];
      }
      await this.repository.updatePartial(data as Partial<T> & { id }, user);
    } catch (e) {
      this._logger.error(e);
      throw e;
    }
  }

  async delete(id: string, user: IUser): Promise<void> {
    try {
      this.permissionService.valid("delete", user);

      await this.repository.delete(id, user);
    } catch (e) {
      this._logger.error(e);
      throw e;
    }
  }

  changes(criteria: { id?: string }): Observable<ItemChangedData> {
    return this.repository.changesByCriteria(criteria);
  }

  private checkValidCreate(item: T, permissions: Array<string>): void {
    const array = getInvalidFields(item, "create", permissions);

    if (array.length) {
      throw new DomainValidationError("Required fields: " + array.join(", "));
    }
  }

  private checkValidUpdate(item: T, permissions: Array<string>): void {
    const array = getInvalidFields(item, "update", permissions);

    if (array.length) {
      throw new DomainValidationError("Required fields: " + array.join(", "));
    }
  }

  private checkValidUpdatePartial(item: Partial<T>, permissions: Array<string>): void {
    if (!isModel(item)) return;

    const keys = Object.keys(item);
    const array = getInvalidFields(item, "update", permissions).filter((invalidField) =>
        keys.some((key) => key === invalidField)
    );

    if (array.length) {
      throw new DomainValidationError("Required fields: " + array.join(", "));
    }
  }
}
