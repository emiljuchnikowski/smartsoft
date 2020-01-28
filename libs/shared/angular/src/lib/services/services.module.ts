import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DeviceDetectorModule } from "ngx-device-detector";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import { ToastService } from "./toast/toast.service";
import { ErrorService } from "./error/error.service";
import { HardwareService } from "./hardware/hardware.service";
import { ModalService } from "./modal/modal.service";

@NgModule({
  imports: [IonicModule, DeviceDetectorModule, TranslateModule.forChild(), DeviceDetectorModule.forRoot()],
  providers: [ToastService, ErrorService, HardwareService, ModalService]
})
export class SharedServicesModule {}
