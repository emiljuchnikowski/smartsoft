import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DeviceDetectorModule } from "ngx-device-detector";
import { TranslateModule } from "@ngx-translate/core";

import { ToastService } from "./toast/toast.service";
import { ErrorService } from "./error/error.service";
import { HardwareService } from "./hardware/hardware.service";
import { ModalService } from "./modal/modal.service";
import { DynamicComponentLoader } from "./dynamic-component-loader/dynamic-component-loader.service";
import {PopoverService} from "./popover/popover.service";

@NgModule({
  imports: [ IonicModule, TranslateModule.forChild(), DeviceDetectorModule.forRoot() ],
  providers: [
    ToastService,
    ErrorService,
    HardwareService,
    ModalService,
    DynamicComponentLoader,
      PopoverService
  ]
})
export class SharedServicesModule {}
