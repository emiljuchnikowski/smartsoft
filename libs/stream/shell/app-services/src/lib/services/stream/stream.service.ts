import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {
    CreatorService,
    DeleteService,
    IStreamCreate,
    IStreamUpdate,
    UpdateService,
    Stream,
    CreateCommentService,
    IStreamCommentCreate, StreamComment
} from "@smartsoft001/stream-domain";

@Injectable()
export class StreamService {
    constructor(
        private readonly creatorService: CreatorService,
        private readonly createCommentService: CreateCommentService,
        private readonly updateService: UpdateService,
        private readonly deleteService: DeleteService,
        @InjectRepository(Stream) private readonly repository: Repository<Stream>
    ) { }

    create(item: IStreamCreate): Promise<string> {
        return this.creatorService.create(item);
    }

    createComment(id: string, item: IStreamCommentCreate): Promise<StreamComment> {
        return this.createCommentService.create(id, item);
    }

    update(item: IStreamUpdate): Promise<any> {
        return this.updateService.update(item);
    }

    delete(id: string): Promise<void> {
        return this.deleteService.delete(id);
    }

    async getById(id: string): Promise<Stream> {
        try {
            return await this.repository.findOne({ _id: id } as any);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
