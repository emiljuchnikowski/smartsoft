import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CookieModule } from "ngx-cookie";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";

import { ToastService } from "./toast/toast.service";
import { ErrorService } from "./error/error.service";
import { HardwareService } from "./hardware/hardware.service";
import { ModalService } from "./modal/modal.service";
import { DynamicComponentLoader } from "./dynamic-component-loader/dynamic-component-loader.service";
import { PopoverService } from "./popover/popover.service";
import { StorageService } from "./storage/storage.service";
import { StyleService } from "./style/style.service";
import { AuthService } from "./auth/auth.service";
import { FingerprintService } from "./fingerprint/fingerprint.service";
import { CameraService } from "./camera/camera.service";
import {FileService} from "./file/file.service";
import {CalendarService} from "./calendar/calendar.service";
import {UIService} from "./ui/ui.service";
import {AlertService} from "./alert/alert.service";
import {DetailsService} from "./details/details.service";

@NgModule({
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    CookieModule.forRoot(),
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
    FingerprintService,
    FingerprintAIO,
    CameraService,
    FileService,
    CalendarService,
    UIService,
    AlertService,
    DetailsService
  ],
})
export class SharedServicesModule {}
