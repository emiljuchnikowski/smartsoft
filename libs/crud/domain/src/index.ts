import { CreateItemHandler } from "./lib/feature-create-item";
import { DeleteItemHandler } from "./lib/feature-delete-item";
import { UpdateItemHandler } from "./lib/feature-update-item";
import { UpdatePartialItemHandler } from "./lib/feature-update-partial-item";
import { CreateManyHandler } from "./lib/feature-create-many";

export * from "./lib/entities";

export const DOMAIN_HANDLERS = [
  CreateItemHandler,
  CreateManyHandler,
  DeleteItemHandler,
  UpdateItemHandler,
  UpdatePartialItemHandler
];
