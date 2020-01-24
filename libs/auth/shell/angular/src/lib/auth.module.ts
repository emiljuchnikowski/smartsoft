import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

import { AuthConfig } from "./auth.config";
import {AuthService} from "./services";
import * as fromAuth from "./+state/auth.reducer";
import { AuthEffects } from "./+state/auth.effects";
import { AuthFacade } from "./+state/auth.facade";
import { SharedModule } from "@smartsoft001/angular";
import { AuthInterceptor } from "./interceptors";
// import {LoginComponent} from "./components";
import { setDefaultTranslationsAndLang } from "./translations-default";
import {AuthGuard, PermissionsGuard} from "./guards";
import {AuthDirective} from "./directives";

const COMPONENTS = [
  // LoginComponent
];

const DIRECTIVES = [
  AuthDirective
];

const GUARDS = [
  AuthGuard,
  PermissionsGuard
];

const INTERCEPTORS = [
  AuthInterceptor
];

const SERVICES = [
    AuthService]
;

const initializer = (
  facade: AuthFacade,
  translateService: TranslateService
) => () => {
  facade.init();
  setDefaultTranslationsAndLang(translateService);
};

// @dynamic
@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthEffects, AuthFacade],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  // entryComponents: [...COMPONENTS],
  // exports: [...COMPONENTS, ...DIRECTIVES]
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
        ...GUARDS,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
