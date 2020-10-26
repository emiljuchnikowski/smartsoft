import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DeviceDetectorModule } from "ngx-device-detector";
import { TranslateModule } from "@ngx-translate/core";
import { CookieModule, TransferHttpModule } from "@gorniv/ngx-universal";

import { ToastService } from "./toast/toast.service";
import { ErrorService } from "./error/error.service";
import { HardwareService } from "./hardware/hardware.service";
import { ModalService } from "./modal/modal.service";
import { DynamicComponentLoader } from "./dynamic-component-loader/dynamic-component-loader.service";
import { PopoverService } from "./popover/popover.service";
import { StorageService } from "./storage/storage.service";
import { StyleService } from "./style/style.service";
import { AuthService } from "./auth/auth.service";

@NgModule({
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    DeviceDetectorModule.forRoot(),
    CookieModule.forRoot(),
    TransferHttpModule,
  ],
  providers: [
    ToastService,
    ErrorService,
    HardwareService,
    ModalService,
    DynamicComponentLoader,
    PopoverService,
    StorageService,
    StyleService,
    AuthService,
  ],
})
export class SharedServicesModule {}
