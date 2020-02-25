import {TokenFactory} from "./lib/feature-create-token";
import {User} from "./lib/entities";

export * from './lib/entities';
export * from './lib/feature-create-token';

export const DOMAIN_SERVICES = [
    TokenFactory
];

export const ENTITIES = [
    User
];
