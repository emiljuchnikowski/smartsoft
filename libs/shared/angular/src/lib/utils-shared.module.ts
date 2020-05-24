import { NgModule } from "@angular/core";
import { DeviceDetectorModule } from "ngx-device-detector";

import { DynamicComponentLoader } from "./services/dynamic-component-loader/dynamic-component-loader.service";
import { HardwareService } from "./services/hardware/hardware.service";
import {SharedFactoriesModule} from "./factories/factories.module";

@NgModule({
  exports: [ SharedFactoriesModule ],
  imports: [DeviceDetectorModule, DeviceDetectorModule.forRoot()],
  providers: [DynamicComponentLoader, HardwareService]
})
export class UtilsSharedModule {}
