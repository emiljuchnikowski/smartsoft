import { Injectable } from "@nestjs/common";
import { ChangeStream, MongoClient } from "mongodb";
import { Observable, Observer } from "rxjs";
import { finalize, share } from "rxjs/operators";
import {Readable, Stream} from "stream";
import * as mongo from "mongodb";

import {
    IEntity,
    IAttachmentRepository,
} from "@smartsoft001/domain-core";

import { MongoConfig } from "../mongo.config";
import { getMongoUrl } from "../mongo.utils";

@Injectable()
export class MongoAttachmentRepository<
    T extends IEntity<string>
    > extends IAttachmentRepository<T> {
    constructor(private config: MongoConfig) {
        super();
    }

    upload(data: { id: string, fileName: string; stream: Stream; mimeType: string; encoding: string }): Promise<string> {
        return new Promise<string>((res, rej) => {
            MongoClient.connect(this.getUrl(), { useUnifiedTopology: true }, async (err, client) => {
                if (err) {
                    rej(err);
                    return;
                }

                const db = client.db(this.config.database);
                const bucket = new mongo.GridFSBucket(db, {
                    bucketName: this.config.collection
                });

                const writeStream = bucket.openUploadStreamWithId(data.id, data.fileName, {
                    contentType: data.mimeType,
                });

                data.stream.pipe(writeStream);

                data.stream.on("finish", () => {
                    res();
                })
            });
        });
    }

    getInfo(id: string): Promise<{ fileName: string, contentType: string, length: number }> {
        return new Promise<{ fileName: string, contentType: string, length: number }>((res, rej) => {
            MongoClient.connect(this.getUrl(), { useUnifiedTopology: true }, async (err, client) => {
                if (err) {
                    rej(err);
                    return;
                }

                const db = client.db(this.config.database);

                const bucket = new mongo.GridFSBucket(db, {
                    bucketName: this.config.collection
                });

                bucket.find({
                    _id: id
                }).toArray(
                    (errDelete, items) => {
                        if (errDelete) {
                            rej(errDelete);
                            return;
                        }

                        client.close();
                        res({
                            fileName: items[0].filename,
                            contentType: items[0].contentType,
                            length: items[0].length
                        });
                    }
                );
            });
        });
    }

    getStream(id: string, options: { start: number; end: number } | undefined): Promise<Readable> {
        return new Promise<Readable>((res, rej) => {
            MongoClient.connect(this.getUrl(), { useUnifiedTopology: true }, async (err, client) => {
                if (err) {
                    rej(err);
                    return;
                }

                const db = client.db(this.config.database);
                const bucket = new mongo.GridFSBucket(db, {
                    bucketName: this.config.collection
                });

                res(bucket.openDownloadStream(id as any, options));
            });
        });
    }

    delete(id: string): Promise<void> {
        return new Promise<void>((res, rej) => {
            MongoClient.connect(this.getUrl(), { useUnifiedTopology: true }, async (err, client) => {
                if (err) {
                    rej(err);
                    return;
                }

                const db = client.db(this.config.database);
                const bucket = new mongo.GridFSBucket(db, {
                    bucketName: this.config.collection
                });

                bucket.delete(id as any, (err2) => {
                    if (err2) rej(err2);
                    else res();

                    client.close();
                });
            });
        });
    }

    private getUrl(): string {
        return getMongoUrl(this.config);
    }
}
