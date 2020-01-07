import {CreateHandler} from "./create/create.handler";
import {DeleteHandler} from "./delete/delete.handler";
import {UpdateHandler} from "./update/update.handler";
import {UpdatePartialHandler} from "./update-partial/update-partial.handler";

export const COMMAND_HANDLERS = [
    CreateHandler,
    DeleteHandler,
    UpdateHandler,
    UpdatePartialHandler
];
