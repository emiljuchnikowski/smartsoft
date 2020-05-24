import { NgModule } from "@angular/core";
import { DeviceDetectorModule } from "ngx-device-detector";

import { DynamicComponentLoader } from "./services/dynamic-component-loader/dynamic-component-loader.service";
import { HardwareService } from "./services/hardware/hardware.service";

@NgModule({
  imports: [DeviceDetectorModule, DeviceDetectorModule.forRoot()],
  providers: [DynamicComponentLoader, HardwareService]
})
export class UtilsSharedModule {}
