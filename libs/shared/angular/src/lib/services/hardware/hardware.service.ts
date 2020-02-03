import {Injectable} from "@angular/core";
import {DeviceDetectorService} from "ngx-device-detector";
import {App} from "@capacitor/core";

@Injectable()
export class HardwareService {
    get isMobile(): boolean {
        return this.deviceDetector.isMobile();
    }

    constructor(private deviceDetector: DeviceDetectorService) { }

    onBackButtonClick(callback: () => void): IHardwareBackHandler {
        return App.addListener('backButton', () => {
            callback();
        });
    }
}

export interface IHardwareBackHandler {
    remove: () => void;
}
