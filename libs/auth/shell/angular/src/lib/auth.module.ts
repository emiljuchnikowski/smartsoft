import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { DataPersistence } from "@nrwl/angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
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

declare const FB;

function addScript(d, id, src) {
  let js;
  const fjs = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement('script'); js.id = id;
  js.src = src;
  fjs.parentNode.insertBefore(js, fjs);
}

export const initializer = (
  facade: AuthFacade,
   translateService: TranslateService,
  config: AuthConfig
) => async () => {

  if (config.facebookId) {
    await new Promise<void>(resolve => {
      // wait for facebook sdk to initialize before starting the angular app
      window['fbAsyncInit'] = function () {
        FB.init({
          appId: config.facebookId,
          cookie: true,
          xfbml: true,
          version: 'v8.0'
        });

        resolve();
      };

      // load facebook sdk script
      addScript(document, 'facebook-jssdk', "https://connect.facebook.net/en_US/sdk.js");
    });
  }

  if (config.googleId) {
    // load google sdk script
    addScript(document, 'google-jssdk', "https://apis.google.com/js/api.js");
  }

  facade.init();
  setDefaultTranslationsAndLang(translateService);
};

// @dynamic
@NgModule({
    imports: [
        TranslateModule,
        SharedModule,
        StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer) as ModuleWithProviders<StoreFeatureModule>,
        EffectsModule.forFeature([AuthEffects]) as ModuleWithProviders<EffectsModule>
    ],
    providers: [AuthEffects, AuthFacade, AuthService],
    declarations: [LoginComponent, AuthDirective],
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
          deps: [AuthFacade, TranslateService, AuthConfig],
          multi: true
        },
        AuthGuard,
        PermissionsGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
