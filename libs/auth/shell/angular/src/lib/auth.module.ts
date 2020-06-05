import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { DataPersistence } from "@nrwl/angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import {StoreFeatureModule, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import { AuthConfig } from "./auth.config";
import * as fromAuth from "./+state/auth.reducer";
import { AuthEffects } from "./+state/auth.effects";
import { AuthFacade } from "./+state/auth.facade";
import { SharedModule } from "@smartsoft001/angular";
import { setDefaultTranslationsAndLang } from "./translations-default";
import {AuthInterceptor} from "./interceptors/auth/auth.interceptor";
import {LoginComponent} from "./components/login/login.component";
import {AuthDirective} from "./directives/auth/auth.directive";
import { AuthGuard } from './guards/auth/auth.guard';
import {PermissionsGuard} from "./guards/permissions/permissions.guard";
import {AuthService} from "./services/auth/auth.service";

export const initializer = (
  facade: AuthFacade,
  translateService: TranslateService
) => () => {
  facade.init();
  setDefaultTranslationsAndLang(translateService);
};

const ngrxImports = [
  StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer) as ModuleWithProviders<StoreFeatureModule>,
  EffectsModule.forFeature([AuthEffects]) as ModuleWithProviders<EffectsModule>
];

// @dynamic
@NgModule({
  imports: [
    SharedModule,
    ...ngrxImports
  ],
  providers: [AuthEffects, AuthFacade, AuthService],
  declarations: [LoginComponent, AuthDirective],
  entryComponents: [LoginComponent],
  exports: [LoginComponent, AuthDirective]
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: config },
        AuthInterceptor,
        AuthService,
        AuthEffects,
        AuthFacade,
        DataPersistence,
        {
          provide: APP_INITIALIZER,
          useFactory: initializer,
          deps: [AuthFacade, TranslateService],
          multi: true
        },
        AuthGuard,
        PermissionsGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
