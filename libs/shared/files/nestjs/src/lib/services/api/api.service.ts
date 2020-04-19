import {BadRequestException, Injectable, NotFoundException, ServiceUnavailableException} from "@nestjs/common";
import {Connection, Model, mongo, Schema, Types} from "mongoose";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import { GridFSBucket, ObjectID } from "mongodb";
import { Http2ServerResponse } from "http2";
import { FastifyReply, FastifyRequest } from "fastify";
import { Stream } from "stream";
import { ObjectId } from "bson";
import * as mongoose from "mongoose";

import { File } from '../../models';

type Request = FastifyRequest;
type Response = FastifyReply<Http2ServerResponse>;

@Injectable()
export class ApiService {
  private readonly _bucket: GridFSBucket;

  constructor(
      @InjectConnection() private readonly connection: Connection,
      @InjectModel('fs.files') private readonly fileModel: Model<File>
  ) {
    this._bucket = new mongo.GridFSBucket(this.connection.db);
  }

  async create(request: any, response: Response) {
    return new Promise((res, rej) => {
      try {
        request.multipart(
          (field, file: Stream, filename, encoding, mimetype) => {
            const uploadStream = this._bucket.openUploadStream(filename, {
              contentType: mimetype
            });

            file.on("end", () => {
              response.header(
                "location",
                this.getLink(request) + "/" + uploadStream.id
              );
              res({
                location: this.getLink(request) + "/" + uploadStream.id
              });
            });

            file.pipe(uploadStream);
          },
          err => {
            if (err) {
              console.error(err);
              rej(new ServiceUnavailableException());
            }
          }
        );
      } catch (e) {
        if (e) {
          console.error(e);
          rej(new ServiceUnavailableException());
        }
      }
    });
  }

  private getLink(req: Request): string {
    return req.headers.origin + req.raw.url;
  }

  async update(id: string, request: any, response: Response) {
    await this.delete(id);

    return await new Promise((res, rej) => {
      try {
        request.multipart(
          (field, file: Stream, filename, encoding, mimetype) => {
            const uploadStream = this._bucket.openUploadStreamWithId(
              id,
              filename,
              {
                contentType: mimetype
              }
            );

            file.on("end", () => {
              response.header(
                "Location",
                this.getLink(request) + "/" + uploadStream.id
              );
              res();
            });

            file.pipe(uploadStream);
          },
          err => {
            if (err) {
              console.error(err);
              rej(new ServiceUnavailableException());
            }
          }
        );
      } catch (e) {
        if (e) {
          console.error(e);
          rej(new ServiceUnavailableException());
        }
      }
    });
  }

  async delete(id: string): Promise<void> {
    await new Promise((res, rej) => {
      const _id = mongoose.mongo.ObjectId.createFromHexString(id);

      this._bucket.delete(_id, err => {
        if (err) {
          console.error(err);
        }

        res();
      });
    });
  }

  async read(id: string, request: Request, response: Response) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestException(null, 'InvalidVideoId')
      }

      const oId = new ObjectId(id)
      // @ts-ignore
      const fileInfo = await this.fileModel.findOne({ _id: oId }).exec();

      if (!fileInfo) {
        throw new NotFoundException(null, 'VideoNotFound')
      }

      if (request.headers.range) {
        const range = request.headers.range.substr(6).split('-')
        const start = parseInt(range[0], 10)
        const end = parseInt(range[1], 10) || null
        const readstream = this._bucket.openDownloadStream(oId, {
          start,
          end,
        })

        response.status(206)
        response.headers({
          'Accept-Ranges': 'bytes',
          'Content-Type': fileInfo.contentType,
          'Content-Range': `bytes ${start}-${end ? end : fileInfo.length - 1}/${
              fileInfo.length
          }`,
          'Content-Length': (end ? end : fileInfo.length) - start,
          'Content-Disposition': `attachment; filename="${encodeURI(fileInfo.filename)}"`,
        })

        response.res.on('close', () => {
          readstream.destroy()
        })

        response.send(readstream)
      } else {
        const readstream = this._bucket.openDownloadStream(oId)

        response.res.on('close', () => {
          readstream.destroy()
        })

        response.status(200)
        response.headers({
          'Accept-Range': 'bytes',
          'Content-Type': fileInfo.contentType,
          'Content-Length': fileInfo.length,
          'Content-Disposition': `attachment; filename="${ encodeURI(fileInfo.filename) }"`,
        })

        response.send(readstream)
      }
    } catch (e) {
      if (e) {
        console.error(e);
        throw new ServiceUnavailableException();
      }
    }
  }
}
