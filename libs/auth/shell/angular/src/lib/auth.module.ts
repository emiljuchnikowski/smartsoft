import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AuthConfig } from "./auth.config";
import { SERVICES } from "./services";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromAuth from "./+state/auth.reducer";
import { AuthEffects } from "./+state/auth.effects";
import {FACADIES} from "./facadies";

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [...FACADIES]
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [{ provide: AuthConfig, useValue: config }, ...SERVICES, ...FACADIES]
    };
  }
}
