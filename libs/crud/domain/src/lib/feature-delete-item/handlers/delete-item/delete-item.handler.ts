import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import {DeleteItemEvent} from "../../delete-item.event";
import {IItemRepository} from "@smartsoft001/domain-core";

@EventsHandler(DeleteItemEvent)
export class DeleteItemHandler implements IEventHandler<DeleteItemEvent> {
    constructor(private readonly repository: IItemRepository<any>) {}

    handle(event: DeleteItemEvent): any {
        return this.repository.delete(event.id, event.user);
    }
}
