import {ToastService} from "./toast/toast.service";
import {ErrorService} from "./error/error.service";

export * from './toast/toast.service';
export * from './error/error.service';

export const SERVICES = [
    ToastService,
    ErrorService
];
