import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DeviceDetectorModule } from "ngx-device-detector";
import { MatTableModule } from "@angular/material";

import { COMPONENTS } from "./components";
import { FACTORIES } from "./factories";
import { setDefaultTranslationsAndLang } from "./translations-default";
import { SERVICES } from "./services";
import { DIRECTIVES } from "./directives";
import { PAGES } from "./pages";
import { PIPES } from "./pipes";

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
