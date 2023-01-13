import { Injectable } from "@nestjs/common";
import { ChangeStream, Db, MongoClient } from "mongodb";
import { Observable, Observer } from "rxjs";
import { finalize, share } from "rxjs/operators";

import {
  IEntity,
  IItemRepository,
  IItemRepositoryOptions,
  ISpecification,
} from "@smartsoft001/domain-core";
import { IUser } from "@smartsoft001/users";
import { ItemChangedData } from "@smartsoft001/crud-shell-dtos";
import { GuidService, ObjectService } from "@smartsoft001/utils";
import { getModelFieldsWithOptions } from "@smartsoft001/models";

import { MongoConfig } from "../mongo.config";
import { getMongoUrl } from "../mongo.utils";
import { IMongoTransaction } from "../mongo.unitofwork";

@Injectable()
export class MongoItemRepository<
  T extends IEntity<string>
> extends IItemRepository<T> {
  readonly useUnifiedTopology = false;

  constructor(protected config: MongoConfig) {
    super();
  }

  create(
    item: T,
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        const db = (repoOptions.transaction as IMongoTransaction).connection.db(
          this.config.database
        );

        db.collection(this.config.collection).insertOne(
          this.getModelToCreate(item as T, user),
          { session: (repoOptions.transaction as IMongoTransaction).session },
          (errInsert) => {
            this.logChange("create", item, repoOptions, user, errInsert);

            if (errInsert) {
              rej(errInsert);
              return;
            }

            res();
          }
        );
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);

          db.collection(this.config.collection).insertOne(
            this.getModelToCreate(item as T, user),
            (errInsert) => {
              this.logChange("create", item, repoOptions, user, errInsert);

              if (errInsert) {
                rej(errInsert);
                return;
              }

              client.close();
              res();
            }
          );
        }
      );
    });
  }

  clear(user: IUser, repoOptions?: IItemRepositoryOptions): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        const db = (repoOptions.transaction as IMongoTransaction).connection.db(
          this.config.database
        );

        db.collection(this.config.collection).deleteMany(
          {},
          { session: (repoOptions.transaction as IMongoTransaction).session },
          (errClear) => {
            this.logChange("clear", null, repoOptions, user, errClear);

            if (errClear) {
              rej(errClear);
              return;
            }

            res();
          }
        );
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);

          db.collection(this.config.collection).deleteMany({}, (err2) => {
            this.logChange("clear", null, repoOptions, user, err2);

            if (err2) {
              rej(err2);
              return;
            }

            client.close();
            res();
          });
        }
      );
    });
  }

  createMany(
    list: T[],
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        const db = (repoOptions.transaction as IMongoTransaction).connection.db(
          this.config.database
        );

        db.collection(this.config.collection).insertMany(
          list.map((item) => this.getModelToCreate(item as T, user)),
          { session: (repoOptions.transaction as IMongoTransaction).session },
          (errInsert) => {
            this.logChange("createMany", null, repoOptions, user, errInsert);

            if (errInsert) {
              rej(errInsert);
              return;
            }

            res();
          }
        );
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);

          db.collection(this.config.collection).insertMany(
            list.map((item) => this.getModelToCreate(item as T, user)),
            (errInsert) => {
              this.logChange("createMany", null, repoOptions, user, errInsert);

              if (errInsert) {
                rej(errInsert);
                return;
              }

              client.close();
              res();
            }
          );
        }
      );
    });
  }

  async update(
    item: T,
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        (async () => {
          const db = (
            repoOptions.transaction as IMongoTransaction
          ).connection.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const info = await this.getInfo(item.id, collection);

          db.collection(this.config.collection).replaceOne(
            { _id: item.id },
            this.getModelToUpdate(item as T, user, info),
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errInsert) => {
              this.logChange("update", item, repoOptions, user, errInsert);

              if (errInsert) {
                rej(errInsert);
                return;
              }

              res();
            }
          );
        })();
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const info = await this.getInfo(item.id, collection);

          db.collection(this.config.collection).replaceOne(
            { _id: item.id },
            this.getModelToUpdate(item as T, user, info),
            (errUpdate) => {
              this.logChange("update", item, repoOptions, user, errUpdate);

              if (errUpdate) {
                rej(errUpdate);
                return;
              }

              client.close();
              res();
            }
          );
        }
      );
    });
  }

  updatePartial(
    item: Partial<T> & { id: string },
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        (async () => {
          const db = (
            repoOptions.transaction as IMongoTransaction
          ).connection.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const info = await this.getInfo(item.id, collection);

          db.collection(this.config.collection).updateOne(
            { _id: item.id },
            {
              $set: this.getModelToUpdate(item as T, user, info),
            },
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errUpdate) => {
              this.logChange(
                "updatePartial",
                item,
                repoOptions,
                user,
                errUpdate
              );

              if (errUpdate) {
                rej(errUpdate);
                return;
              }

              res();
            }
          );
        })();
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const info = await this.getInfo(item.id, collection);

          db.collection(this.config.collection).updateOne(
            { _id: item.id },
            {
              $set: this.getModelToUpdate(item as T, user, info),
            },
            (errUpdate) => {
              this.logChange(
                "updatePartial",
                item,
                repoOptions,
                user,
                errUpdate
              );

              if (errUpdate) {
                rej(errUpdate);
                return;
              }

              client.close();
              res();
            }
          );
        }
      );
    });
  }

  updatePartialManyByCriteria(
    criteria: any,
    set: Partial<T>,
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        (async () => {
          const db = (
            repoOptions.transaction as IMongoTransaction
          ).connection.db(this.config.database);

          this.convertIdInCriteria(criteria);

          db.collection(this.config.collection).updateMany(
            criteria,
            {
              $set: {
                ...set,
                "__info.update": {
                  username: user?.username,
                  date: new Date(),
                },
              },
            },
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errUpdate) => {
              this.logChange(
                "updatePartialManyByCriteria",
                {
                  ...criteria,
                  set,
                },
                repoOptions,
                user,
                errUpdate
              );

              if (errUpdate) {
                rej(errUpdate);
                return;
              }

              res();
            }
          );
        })();
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);
          const collection = db.collection(this.config.collection);

          this.convertIdInCriteria(criteria);

          db.collection(this.config.collection).updateMany(
            criteria,
            {
              $set: {
                ...set,
                "__info.update": {
                  username: user?.username,
                  date: new Date(),
                },
              },
            },
            (errUpdate) => {
              this.logChange(
                "updatePartialManyByCriteria",
                {
                  ...criteria,
                  set,
                },
                repoOptions,
                user,
                errUpdate
              );

              if (errUpdate) {
                rej(errUpdate);
                return;
              }

              client.close();
              res();
            }
          );
        }
      );
    });
  }

  updatePartialManyBySpecification(
    spec: ISpecification,
    set: Partial<T>,
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    return this.updatePartialManyByCriteria(
      spec.criteria,
      set,
      user,
      repoOptions
    );
  }

  delete(
    id: string,
    user: IUser,
    repoOptions?: IItemRepositoryOptions
  ): Promise<void> {
    if (repoOptions && repoOptions.transaction) {
      return new Promise<void>((res, rej) => {
        (async () => {
          const db = (
            repoOptions.transaction as IMongoTransaction
          ).connection.db(this.config.database);

          db.collection(this.config.collection).deleteOne(
            { _id: id },
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errDelete) => {
              this.logChange(
                "delete",
                {
                  id,
                },
                repoOptions,
                user,
                errDelete
              );

              if (errDelete) {
                rej(errDelete);
                return;
              }

              res();
            }
          );
        })();
      });
    }

    return new Promise<void>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);

          db.collection(this.config.collection).deleteOne(
            { _id: id },
            (errDelete) => {
              this.logChange(
                "delete",
                {
                  id,
                },
                repoOptions,
                user,
                errDelete
              );

              if (errDelete) {
                rej(errDelete);
                return;
              }

              client.close();
              res();
            }
          );
        }
      );
    });
  }

  getById(id: string, repoOptions?: IItemRepositoryOptions): Promise<T> {
    return new Promise<T>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);

          if (repoOptions && repoOptions.transaction) {
            db.collection(this.config.collection).findOne(
              { _id: id },
              {
                session: (repoOptions.transaction as IMongoTransaction).session,
              },
              (errDelete, item) => {
                if (errDelete) {
                  rej(errDelete);
                  return;
                }

                client.close();
                res(this.getModelToResult(item));
              }
            );
          }

          db.collection(this.config.collection).findOne(
            { _id: id },
            (errDelete, item) => {
              if (errDelete) {
                rej(errDelete);
                return;
              }

              client.close();
              res(this.getModelToResult(item));
            }
          );
        }
      );
    });
  }

  getByCriteria(
    criteria: any,
    options: any = {}
  ): Promise<{ data: T[]; totalCount: number }> {
    return new Promise<{ data: T[]; totalCount: number }>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          this.convertIdInCriteria(criteria);

          this.generateSearch(criteria);

          const db = client.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const totalCount = await this.getCount(criteria, collection);

          let cursor = null;

          const aggregate = [];

          if (criteria) {
            aggregate.push({ $match: criteria });
          }

          if (options.sort) {
            aggregate.push({ $sort: options.sort });
          }

          if (options.skip) {
            aggregate.push({ $skip: options.skip });
          }

          if (options.limit) {
            aggregate.push({ $limit: options.limit });
          }

          if (options.project) {
            aggregate.push({ $project: options.project });
          }

          if (options.min) {
            aggregate.push({ $min: options.min });
          }

            if (options.max) {
                aggregate.push({ $max: options.max });
            }

          if (options.group) {
            aggregate.push({ $group: options.group });
          }

          collection
            .aggregate(aggregate, {
              allowDiskUse: options.allowDiskUse,
              session: options.session,
            })
            .toArray((errDelete, list) => {
              if (errDelete) {
                rej(errDelete);
                return;
              }

              client.close();
              res({
                data: list.map((item) => this.getModelToResult(item)),
                totalCount,
              });
            });
        }
      );
    });
  }

  getBySpecification(
    spec: ISpecification,
    options: any = {}
  ): Promise<{ data: T[]; totalCount: number }> {
    return this.getByCriteria(spec.criteria, options);
  }

  countByCriteria(criteria: any): Promise<number> {
    return new Promise<number>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          this.convertIdInCriteria(criteria);

          this.generateSearch(criteria);

          const db = client.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const result = await this.getCount(criteria, collection);
          await client.close();
          res(result);
        }
      );
    });
  }

  countBySpecification(spec: ISpecification): Promise<number> {
    return this.countByCriteria(spec.criteria);
  }

  changesByCriteria(criteria: { id?: string }): Observable<ItemChangedData> {
    let stream: ChangeStream<any>;
    let client: MongoClient;

    return new Observable((observer: Observer<ItemChangedData>) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, c) => {
          client = c;

          if (err) {
            observer.error(err);
            return;
          }

          const db = client.db(this.config.database);
          const collection = db.collection(this.config.collection);

          const pipeline = criteria.id
            ? [
                {
                  $match: {
                    "documentKey._id": criteria.id,
                  },
                },
              ]
            : [];

          stream = collection.watch(pipeline).on("change", (result) => {
            observer.next({
              id: result["documentKey"]["_id"],
              type: this.mapChangeType(result.operationType),
              data:
                result.operationType === "update"
                  ? result["updateDescription"]
                  : this.getModelToResult(result["fullDocument"]),
            } as any);
          });
        }
      );
    }).pipe(
      finalize(async () => {
        console.log("Stop watch");

        await stream.close();
        await client.close();
      }),
      share()
    );
  }

  protected getContext<TResult>(
    handler: (db: Db) => Promise<TResult>
  ): Promise<TResult> {
    return new Promise<TResult>((res, rej) => {
      MongoClient.connect(
        this.getUrl(),
        { useUnifiedTopology: this.useUnifiedTopology },
        async (err, client) => {
          if (err) {
            rej(err);
            return;
          }

          const db = client.db(this.config.database);

          try {
            const result = await handler(db);
            await client.close();
            res(result);
          } catch (e) {
            await client.close();
            rej(e);
          }
        }
      );
    });
  }

  protected getCount(criteria: any, collection): Promise<any> {
    return new Promise<any>((res, rej) => {
      this.convertIdInCriteria(criteria);

      collection.countDocuments(criteria, (err, count) => {
        if (err) {
          rej(err);
          return;
        }

        res(count);
      });
    });
  }

  protected getInfo(id: string, collection): Promise<any> {
    return new Promise<any>((res, rej) => {
      collection
        .aggregate([{ $match: { _id: id } }, { $project: { __info: 1 } }])
        .toArray((err, array) => {
          if (err) {
            rej(err);
            return;
          }

          if (!array || !array[0]) {
            res(null);
          }

          res(array[0]["__info"]);
        });
    });
  }

  protected getModelToCreate(item: T, user: IUser): T {
    const result = ObjectService.removeTypes(item);
    result["_id"] = result.id;
    delete result.id;

    result["__info"] = {
      create: {
        username: user ? user.username : null,
        date: new Date(),
      },
    };

    return result;
  }

  protected mapChangeType(dbType: string) {
    const map = {
      insert: "create",
      update: "update",
      delete: "delete",
    };

    return map[dbType];
  }

  protected getModelToUpdate(
    item: { id: string },
    user: IUser,
    info
  ): { id: string } {
    const result = ObjectService.removeTypes(item);
    result["_id"] = result.id;
    delete result.id;

    result["__info"] = {
      ...info,
      update: {
        username: user ? user.username : null,
        date: new Date(),
      },
    };

    return result;
  }

  protected getModelToResult(item: T): T {
    if (!item) return null;

    const result = ObjectService.removeTypes(item) as any;
    result["id"] = result._id;

    delete result._id;
    delete result["__info"];

    return result as T;
  }

  protected getUrl(): string {
    return getMongoUrl(this.config);
  }

  protected logChange(type, item, options, user, error) {
    MongoClient.connect(
      this.getUrl(),
      { useUnifiedTopology: this.useUnifiedTopology },
      (err, client) => {
        if (err) {
          console.warn(err);
          return;
        }

        const db = client.db(this.config.database);

        db.collection("changes").insertOne(
          {
            type,
            collection: this.config.collection,
            item,
            options,
            user,
            error,
            date: new Date(),
          },
          (errInsert) => {
            client.close();

            if (errInsert) {
              console.warn(err);
              return;
            }
          }
        );
      }
    );
  }

  protected generateSearch(criteria: any): void {
    if (!criteria["$search"]) return;

    if (this.config.type) {
      const modelFields = getModelFieldsWithOptions(
        new this.config.type()
      ).filter((i) => i.options.search);

      if (modelFields.length) {
        const searchArray = [];

        modelFields.forEach((val) => {
          const res = {};

          res[val.key] = {
            $regex: this.convertRegex(criteria["$search"]),
            $options: "i",
          };

          searchArray.push(res);
        });

        if (!criteria["$or"]) criteria["$or"] = searchArray;
        else if (criteria["$or"] && !criteria["$and"]) {
          criteria["$and"] = [{ $or: criteria["$or"] }, { $or: searchArray }];

          delete criteria["$or"];
        } else if (criteria["$and"]) {
          criteria["$and"] = [...criteria["$and"], { $or: searchArray }];
        }

        delete criteria["$search"];

        return;
      }
    }

    const customCriteria = {
      $text: { $search: ' "' + this.convertRegex(criteria["$search"]) + '" ' },
    };

    delete criteria["$search"];

    criteria = {
      ...criteria,
      ...customCriteria,
    };
  }

  protected convertIdInCriteria(criteria: any) {
    if (criteria["id"]) {
      criteria["_id"] = criteria["id"];
      delete criteria["id"];
    }
  }

  protected convertRegex(val: string): string {
    return val.toString().replace(/\*/g, "[*]");
  }
}
