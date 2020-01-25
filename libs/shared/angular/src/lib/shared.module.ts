import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DeviceDetectorModule } from "ngx-device-detector";
import { MatTableModule } from "@angular/material";

import { setDefaultTranslationsAndLang } from "./translations-default";
import { DetailTextComponent } from "./components/detail/text/text.component";
import { DetailFlagComponent } from "./components/detail/flag/flag.component";
import { DetailEnumComponent } from "./components/detail/enum/enum.component";
import { DetailEmailComponent } from "./components/detail/email/email.component";
import { InputErrorComponent } from "./components/input/error/error.component";
import { InputTextComponent } from "./components/input/text/text.component";
import { InputPasswordComponent } from "./components/input/password/password.component";
import { InputFlagComponent } from "./components/input/flag/flag.component";
import { InputEnumComponent } from "./components/input/enum/enum.component";
import { InputEmailComponent } from "./components/input/email/email.component";
import { InputCurrencyComponent } from "./components/input/currency/currency.component";
import { InputDateComponent } from "./components/input/date/date.component";
import { DetailsDirective } from "./directives/details/details.directive";
import { DetailsPage } from "./pages/details/details.page";
import { EnumToListPipe } from "./pipes/enum-to-list/enum-to-list.pipe";
import { AppSplitPanelComponent } from "./components/app/split-panel/split-panel.component";
import { ButtonComponent } from "./components/button/button.component";
import { CardComponent } from "./components/card/card.component";
import { DetailComponent } from "./components/detail/detail.component";
import { DetailsStandardComponent } from "./components/details/standard/standard.component";
import { DetailsComponent } from "./components/details/details.component";
import { FormComponent } from "./components/form/form.component";
import { FormStandardComponent } from "./components/form/standard/standard.component";
import { InputComponent } from "./components/input/input.component";
import { ListComponent } from "./components/list/list.component";
import { ListMobileComponent } from "./components/list/mobile/mobile.component";
import { ListDesktopComponent } from "./components/list/desktop/desktop.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { PageStandardComponent } from "./components/page/standard/standard.component";
import { PageComponent } from "./components/page/page.component";
import { FormFactory } from "./factories/form/form.factory";
import { ToastService } from "./services/toast/toast.service";
import { ErrorService } from "./services/error/error.service";
import { HardwareService } from "./services/hardware/hardware.service";
import { ModalService } from "./services/modal/modal.service";

const APP_COMPONENTS = [AppSplitPanelComponent];

const BUTTON_COMPONENTS = [ButtonComponent];

const CARD_COMPONENTS = [CardComponent];

const DETAIL_COMPONENTS = [
  DetailComponent,
  DetailTextComponent,
  DetailFlagComponent,
  DetailEnumComponent,
  DetailEmailComponent
];

const DETAILS_COMPONENTS = [DetailsStandardComponent, DetailsComponent];

const FORM_COMPONENTS = [FormStandardComponent, FormComponent];

const INPUT_COMPONENTS = [
  InputComponent,
  InputErrorComponent,
  InputTextComponent,
  InputPasswordComponent,
  InputFlagComponent,
  InputEnumComponent,
  InputEmailComponent,
  InputCurrencyComponent,
  InputDateComponent
];

const LIST_COMPONENTS = [
  ListComponent,
  ListMobileComponent,
  ListDesktopComponent
];

const LOADER_COMPONENTS = [LoaderComponent];

const PAGE_COMPONENTS = [PageStandardComponent, PageComponent];

const COMPONENTS = [
  ...FORM_COMPONENTS,
  ...APP_COMPONENTS,
  ...PAGE_COMPONENTS,
  ...INPUT_COMPONENTS,
  ...BUTTON_COMPONENTS,
  ...CARD_COMPONENTS,
  ...LIST_COMPONENTS,
  ...DETAILS_COMPONENTS,
  ...LOADER_COMPONENTS,
  ...DETAIL_COMPONENTS
];

const DIRECTIVES = [DetailsDirective];

const FACTORIES = [FormFactory];

const PAGES = [DetailsPage];

const PIPES = [EnumToListPipe];

const SERVICES = [ToastService, ErrorService, HardwareService, ModalService];

@NgModule({
  providers: [...FACTORIES, ...SERVICES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PAGES, ...PIPES],
  entryComponents: [...COMPONENTS, ...PAGES],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    MatTableModule
  ],
  exports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...PAGES,
    TranslateModule,
    HttpClientModule
  ]
})
export class SharedModule {
  constructor(translateService: TranslateService) {
    setDefaultTranslationsAndLang(translateService);
  }
}
