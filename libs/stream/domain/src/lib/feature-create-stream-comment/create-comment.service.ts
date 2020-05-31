import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository, Repository} from "typeorm";

import {DomainValidationError} from "@smartsoft001/domain-core";

import {Stream} from "../entities/stream.entity";
import {IStreamCommentCreate} from "./interfaces";
import {StreamComment} from "../value-objects/comment.value-object";

@Injectable()
export class CreateCommentService {
    constructor(
        // fix: for update one
        @InjectRepository(Stream) private repository: MongoRepository<Stream>
    ) { }

    async create(id: string, item: IStreamCommentCreate): Promise<StreamComment> {
        this.valid(id, item);

        const comment = new StreamComment(item.body, new Date(), item.username, item.annonimus);

        await this.repository.updateOne({
            _id: id
        }, {
            $push: {
                comments: {
                    $each: [ comment ],
                    $sort: { createDate: -1 }
                }
            }
        } as any);

        return comment;
    }

    private valid(id, req: IStreamCommentCreate) {
        if (!id) throw new DomainValidationError("id is empty");
        if (!req) throw new DomainValidationError("item is empty");
        if (!req.body) throw new DomainValidationError("body is empty");
        if (!req.username) throw new DomainValidationError("username is empty");
    }
}
