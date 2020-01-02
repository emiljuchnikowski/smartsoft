import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// required
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { SharedModule } from "@smartsoft001/angular";
import {AuthModule} from "@smartsoft001/auth-shell-angular";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: "shared",
          loadChildren: () =>
            import("./shared/shared.module").then(m => m.SharedModule)
        },
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
      ],
      { initialNavigation: "enabled", useHash: true }
    ),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    EffectsModule.forRoot([]),
    SharedModule,
    AuthModule.forRoot({
      apiUrl: 'test',
      clientId: 'admin'
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
