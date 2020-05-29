import {Injectable} from "@nestjs/common";

import {CreatorService, IStreamCreate} from "@smartsoft001/stream-domain";

@Injectable()
export class StreamService {
    constructor(private readonly creatorService: CreatorService) { }

    create(item: IStreamCreate): Promise<string> {
        return this.creatorService.create(item);
    }
}
