import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { IEntity, IItemRepository } from "@smartsoft001/domain-core";
import {UpdatePartialItemEvent} from "../../update-partial-item.event";

@EventsHandler(UpdatePartialItemEvent)
export class UpdatePartialItemHandler<T extends IEntity<string>>
    implements IEventHandler<UpdatePartialItemEvent<T>> {
    constructor(private readonly repository: IItemRepository<T>) {}

    handle(event: UpdatePartialItemEvent<T>): any {
        return this.repository.updatePartial(event.item, event.user);
    }
}
