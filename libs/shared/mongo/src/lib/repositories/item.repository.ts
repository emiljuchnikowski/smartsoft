import { Injectable } from "@nestjs/common";
import { ChangeStream, MongoClient } from "mongodb";
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
import {ObjectService} from "@smartsoft001/utils";
import {getModelFieldsWithOptions} from "@smartsoft001/models";

import { MongoConfig } from "../mongo.config";
import { getMongoUrl } from "../mongo.utils";
import { IMongoTransaction } from "../mongo.unitofwork";

@Injectable()
export class MongoItemRepository<
  T extends IEntity<string>
> extends IItemRepository<T> {
  readonly useUnifiedTopology = false;
  
  constructor(private config: MongoConfig) {
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
            this.logChange('create', item, repoOptions, user, errInsert);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        const db = client.db(this.config.database);

        db.collection(this.config.collection).insertOne(
          this.getModelToCreate(item as T, user),
          (errInsert) => {
            this.logChange('create', item, repoOptions, user, errInsert);

            if (errInsert) {
              rej(errInsert);
              return;
            }

            client.close();
            res();
          }
        );
      });
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
            this.logChange('clear', null, repoOptions, user, errClear);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        const db = client.db(this.config.database);

        db.collection(this.config.collection).deleteMany({}, (err2) => {
          this.logChange('clear', null, repoOptions, user, err2);

          if (err2) {
            rej(err2);
            return;
          }

          client.close();
          res();
        });
      });
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
            this.logChange('createMany', null, repoOptions, user, errInsert);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        const db = client.db(this.config.database);

        db.collection(this.config.collection).insertMany(
          list.map((item) =>
            this.getModelToCreate(item as T, user)
          ),
          (errInsert) => {
            this.logChange('createMany', null, repoOptions, user, errInsert);

            if (errInsert) {
              rej(errInsert);
              return;
            }

            client.close();
            res();
          }
        );
      });
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
          const db = (repoOptions.transaction as IMongoTransaction).connection.db(
            this.config.database
          );
          const collection = db.collection(this.config.collection);

          const info = await this.getInfo(item.id, collection);

          db.collection(this.config.collection).replaceOne(
            { _id: item.id },
            this.getModelToUpdate(item as T, user, info),
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errInsert) => {
              this.logChange('update', item, repoOptions, user, errInsert);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, async (err, client) => {
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
            this.logChange('update', item, repoOptions, user, errUpdate);

            if (errUpdate) {
              rej(errUpdate);
              return;
            }

            client.close();
            res();
          }
        );
      });
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
          const db = (repoOptions.transaction as IMongoTransaction).connection.db(
            this.config.database
          );
          const collection = db.collection(this.config.collection);

          const info = await this.getInfo(item.id, collection);

          db.collection(this.config.collection).updateOne(
            { _id: item.id },
            {
              $set: this.getModelToUpdate(item as T, user, info),
            },
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errUpdate) => {
              this.logChange('updatePartial', item, repoOptions, user, errUpdate);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, async (err, client) => {
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
            this.logChange('updatePartial', item, repoOptions, user, errUpdate);

            if (errUpdate) {
              rej(errUpdate);
              return;
            }

            client.close();
            res();
          }
        );
      });
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
          const db = (repoOptions.transaction as IMongoTransaction).connection.db(
            this.config.database
          );

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
              this.logChange('updatePartialManyByCriteria', {
                ...criteria,
                set
              }, repoOptions, user, errUpdate);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, async (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        const db = client.db(this.config.database);
        const collection = db.collection(this.config.collection);

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
            this.logChange('updatePartialManyByCriteria', {
              ...criteria,
              set
            }, repoOptions, user, errUpdate);

            if (errUpdate) {
              rej(errUpdate);
              return;
            }

            client.close();
            res();
          }
        );
      });
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
          const db = (repoOptions.transaction as IMongoTransaction).connection.db(
            this.config.database
          );

          db.collection(this.config.collection).deleteOne(
            { _id: id },
            { session: (repoOptions.transaction as IMongoTransaction).session },
            (errDelete) => {
              this.logChange('delete', {
                id
              }, repoOptions, user, errDelete);

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
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        const db = client.db(this.config.database);

        db.collection(this.config.collection).deleteOne(
          { _id: id },
          (errDelete) => {
            this.logChange('delete', {
              id
            }, repoOptions, user, errDelete);

            if (errDelete) {
              rej(errDelete);
              return;
            }

            client.close();
            res();
          }
        );
      });
    });
  }

  getById(id: string): Promise<T> {
    return new Promise<T>((res, rej) => {
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        const db = client.db(this.config.database);

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
      });
    });
  }

  getByCriteria(
    criteria: any,
    options: any = {}
  ): Promise<{ data: T[]; totalCount: number }> {
    return new Promise<{ data: T[]; totalCount: number }>((res, rej) => {
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, async (err, client) => {
        if (err) {
          rej(err);
          return;
        }

        this.generateSearch(criteria);

        const db = client.db(this.config.database);
        const collection = db.collection(this.config.collection);

        const totalCount = await this.getCount(criteria, collection);

        collection.find(criteria, options).toArray((errDelete, list) => {
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
      });
    });
  }

  getBySpecification(
    spec: ISpecification,
    options: any = {}
  ): Promise<{ data: T[]; totalCount: number }> {
    return this.getByCriteria(spec.criteria, options);
  }

  changesByCriteria(criteria: { id?: string }): Observable<ItemChangedData> {
    let stream: ChangeStream<any>;
    let client: MongoClient;

    return new Observable((observer: Observer<ItemChangedData>) => {
      MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, async (err, c) => {
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
      });
    }).pipe(
      finalize(async () => {
        console.log("Stop watch");

        await stream.close();
        await client.close();
      }),
      share()
    );
  }

  private getCount(criteria: any, collection): Promise<any> {
    return new Promise<any>((res, rej) => {
      collection.countDocuments(criteria, (err, count) => {
        if (err) {
          rej(err);
          return;
        }

        res(count);
      });
    });
  }

  private getInfo(id: string, collection): Promise<any> {
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

  private getModelToCreate(item: T, user: IUser): T {
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

  private mapChangeType(dbType: string) {
    const map = {
      insert: "create",
      update: "update",
      delete: "delete",
    };

    return map[dbType];
  }

  private getModelToUpdate(
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

  private getModelToResult(item: T): T {
    if (!item) return null;

    const result = ObjectService.removeTypes(item) as any;
    result["id"] = result._id;

    delete result._id;
    delete result["__info"];

    return result as T;
  }

  private getUrl(): string {
    return getMongoUrl(this.config);
  }

  private logChange(type, item, options, user, error) {
    MongoClient.connect(this.getUrl(), { useUnifiedTopology: this.useUnifiedTopology }, (err, client) => {
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
            date: new Date()
          },
        (errInsert) => {
          client.close();

          if (errInsert) {
            console.warn(err);
            return;
          }
        }
      );
    });
  }

  private generateSearch(criteria: any): void {
    if (!criteria["$search"]) return;

    if (this.config.type) {
      const modelFields = getModelFieldsWithOptions(new this.config.type()).filter(i => i.options.search);

      if (modelFields.length) {
        modelFields.forEach(val => {
          criteria[val.key] = { $regex: criteria["$search"], $options: 'i' };
        });

        delete criteria["$search"];

        return;
      }
    }

    const customCriteria = {
      $text: { $search: ' "' + criteria["$search"].toString() + '" ' },
    };

    delete criteria["$search"];

    criteria = {
      ...criteria,
      ...customCriteria,
    };
  }
}
