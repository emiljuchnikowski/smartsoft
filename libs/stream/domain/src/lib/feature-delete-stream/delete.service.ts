import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Stream} from "@smartsoft001/stream-domain";

@Injectable()
export class DeleteService {
    constructor(
        @InjectRepository(Stream) private repository: Repository<Stream>
    ) { }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
