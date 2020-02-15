import {Injectable} from "@nestjs/common";

import {ITransCreate, TransCreatorService} from "@smartsoft001/trans-domain";

@Injectable()
export class TransService {
    constructor(private creatorService: TransCreatorService<any>) {
    }

    create<T>(ops: ITransCreate<T>): Promise<string> {
        return this.creatorService.create(ops);
    }
}
