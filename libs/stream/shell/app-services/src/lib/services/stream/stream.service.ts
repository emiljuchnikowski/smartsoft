import {Injectable} from "@nestjs/common";

import {CreatorService, DeleteService, IStreamCreate, IStreamUpdate, UpdateService} from "@smartsoft001/stream-domain";

@Injectable()
export class StreamService {
    constructor(
        private readonly creatorService: CreatorService,
        private readonly updateService: UpdateService,
        private readonly deleteService: DeleteService
    ) { }

    create(item: IStreamCreate): Promise<string> {
        return this.creatorService.create(item);
    }

    update(item: IStreamUpdate): Promise<any> {
        return this.updateService.update(item);
    }

    delete(id: string): Promise<void> {
        return this.deleteService.delete(id);
    }
}
