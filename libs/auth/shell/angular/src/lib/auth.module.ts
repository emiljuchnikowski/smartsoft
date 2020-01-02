import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

import { AuthConfig } from "./auth.config";
import { SERVICES } from "./services";
import * as fromAuth from "./+state/auth.reducer";
import { AuthEffects } from "./+state/auth.effects";
import { AuthFacade } from "./+state/auth.facade";
import { SharedModule } from "@smartsoft001/angular";
import { INTERCEPTORS, AuthInterceptor } from "./interceptors";
import { COMPONENTS } from "./components";
import {setDefaultTranslationsAndLang} from "./translations-default";

const initializer = (facade: AuthFacade, translateService: TranslateService) => () => {
  facade.init();
  setDefaultTranslationsAndLang(translateService);
};

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthEffects, AuthFacade],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: config },
        ...SERVICES,
        ...INTERCEPTORS,
        AuthEffects,
        AuthFacade,
        DataPersistence,
        {
          provide: APP_INITIALIZER,
          useFactory: initializer,
          deps: [AuthFacade, TranslateService],
          multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
