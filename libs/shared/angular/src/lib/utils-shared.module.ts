import { NgModule } from "@angular/core";

import { DynamicComponentLoader } from "./services/dynamic-component-loader/dynamic-component-loader.service";
import { HardwareService } from "./services/hardware/hardware.service";
import {SharedFactoriesModule} from "./factories/factories.module";

@NgModule({
  exports: [ SharedFactoriesModule ],
  providers: [DynamicComponentLoader, HardwareService]
})
export class UtilsSharedModule {}
