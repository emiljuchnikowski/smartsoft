import {CreateItemHandler} from "./lib/feature-create-item";
import {DeleteItemHandler} from "./lib/feature-delete-item";
import {UpdateItemHandler} from "./lib/feature-update-item";
import {UpdatePartialItemHandler} from "./lib/feature-update-partial-item";

export * from "./lib/entities";

export const DOMAIN_HANDLERS = [
  CreateItemHandler,
  DeleteItemHandler,
  UpdateItemHandler,
  UpdatePartialItemHandler
];
