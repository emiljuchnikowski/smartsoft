import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DeviceDetectorModule } from "ngx-device-detector";
import { MatTableModule } from "@angular/material";

import {
  AppSplitPanelComponent,
  ButtonComponent,
  CardComponent,
  DetailComponent,
  FormComponent,
  FormStandardComponent,
  InputComponent,
  ListComponent,
  ListDesktopComponent,
  ListMobileComponent,
  LoaderComponent, PageComponent,
  PageStandardComponent
} from "./components";
import {FormFactory} from "./factories";
import { setDefaultTranslationsAndLang } from "./translations-default";
import {ErrorService, HardwareService, ModalService, ToastService} from "./services";
import {DetailTextComponent} from "./components/detail/text/text.component";
import {DetailFlagComponent} from "./components/detail/flag/flag.component";
import {DetailEnumComponent} from "./components/detail/enum/enum.component";
import {DetailEmailComponent} from "./components/detail/email/email.component";
import {DetailsComponent, DetailsStandardComponent} from "./components/details";
import {InputErrorComponent} from "./components/input/error/error.component";
import {InputTextComponent} from "./components/input/text/text.component";
import {InputPasswordComponent} from "./components/input/password/password.component";
import {InputFlagComponent} from "./components/input/flag/flag.component";
import {InputEnumComponent} from "./components/input/enum/enum.component";
import {InputEmailComponent} from "./components/input/email/email.component";
import {InputCurrencyComponent} from "./components/input/currency/currency.component";
import {InputDateComponent} from "./components/input/date/date.component";
import {DetailsDirective} from "./directives/details/details.directive";
import {DetailsPage} from "./pages/details/details.page";
import {EnumToListPipe} from "./pipes/enum-to-list/enum-to-list.pipe";

const APP_COMPONENTS = [
  AppSplitPanelComponent
];

const BUTTON_COMPONENTS = [
  ButtonComponent
];

const CARD_COMPONENTS = [
  CardComponent
];

const DETAIL_COMPONENTS = [
  DetailComponent,
  DetailTextComponent,
  DetailFlagComponent,
  DetailEnumComponent,
  DetailEmailComponent
];

const DETAILS_COMPONENTS = [
  DetailsStandardComponent,
  DetailsComponent
];

const FORM_COMPONENTS = [
  FormStandardComponent,
  FormComponent
];

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

const LOADER_COMPONENTS =[
  LoaderComponent
];

const PAGE_COMPONENTS = [
  PageStandardComponent,
  PageComponent
];

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

const DIRECTIVES = [
  DetailsDirective
];

const FACTORIES = [
  FormFactory
];

const PAGES = [
  DetailsPage
];

const PIPES = [
  EnumToListPipe
];

const SERVICES = [
  ToastService,
  ErrorService,
  HardwareService,
  ModalService
];

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
