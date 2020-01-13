import {ToastService} from "./toast/toast.service";
import {ErrorService} from "./error/error.service";
import {HardwareService} from "./hardware/hardware.service";
import {ModalService} from "./modal/modal.service";

export * from './toast/toast.service';
export * from './error/error.service';
export * from './hardware/hardware.service';
export * from "./modal/modal.service";

export const SERVICES = [
    ToastService,
    ErrorService,
    HardwareService,
    ModalService
];
