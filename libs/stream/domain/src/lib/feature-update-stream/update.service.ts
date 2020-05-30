import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Stream} from "@smartsoft001/stream-domain";
import {IStreamUpdate} from "./interfaces";
import {DomainValidationError} from "@smartsoft001/domain-core";

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(Stream) private repository: Repository<Stream>
    ) { }

    async update(item: IStreamUpdate): Promise<void> {
        this.valid(item);

        const id = item.id;
        delete item.id;

        await this.repository.update({
            id: item.id
        }, item as any);
    }

    private valid(req: IStreamUpdate) {
        if (!req) throw new DomainValidationError("item is empty");
        if (!req.id) throw new DomainValidationError("id is empty");
    }
}
