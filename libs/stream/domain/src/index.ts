import {CreatorService} from "./lib/feature-create-stream/creator.service";
import {UpdateService} from "./lib/feature-update-stream";

export * from "./lib/stream.config";
export * from "./lib/entities";
export * from "./lib/value-objects";
export * from "./lib/feature-create-stream";
export * from "./lib/feature-update-stream";

export const DOMAIN_SERVICES = [
    CreatorService,
    UpdateService
];
