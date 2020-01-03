import {AuthGuard} from "./auth/auth.guard";
import {PermissionsGuard} from "./permissions/permissions.guard";

export * from './auth/auth.guard';
export * from './permissions/permissions.guard';

export const GUARDS = [
    AuthGuard,
    PermissionsGuard
];
