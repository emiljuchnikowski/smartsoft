import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Guid} from "guid-typescript";

import {DomainValidationError} from "@smartsoft001/domain-core";

import { Stream } from "../entities/stream.entity";
import {IStreamCreate} from "./interfaces";

@Injectable()
export class CreatorService {
    constructor(
        @InjectRepository(Stream) private repository: Repository<Stream>
    ) { }

    async create(item: IStreamCreate): Promise<string> {
        this.valid(item);

        const entity = new Stream();
        entity.id = Guid.raw();
        entity.createDate = new Date();
        entity.modifyDate = entity.createDate;
        entity.comments = [];

        await this.repository.save(entity);

        return entity.id;
    }

    private valid(req: IStreamCreate) {
        if (!req) throw new DomainValidationError("item is empty");
        if (!req.title) throw new DomainValidationError("title is empty");
    }
}
