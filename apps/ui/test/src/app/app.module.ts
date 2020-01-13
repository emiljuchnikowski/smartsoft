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
import { NgrxSharedModule, SharedModule } from "@smartsoft001/angular";
import { AuthModule, PermissionsGuard } from "@smartsoft001/auth-shell-angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: "shared",
          canActivate: [PermissionsGuard],
          data: {
            expectedPermissions: ["admin"]
          },
          loadChildren: () =>
            import("./shared/shared.module").then(m => m.SharedModule)
        },
        {
          path: "users",
          canActivate: [PermissionsGuard],
          data: {
            expectedPermissions: ["admin"]
          },
          loadChildren: () =>
            import("./users/users.module").then(m => m.UsersModule)
        },
        {
          path: "login",
          loadChildren: () =>
            import("./login/login.module").then(m => m.LoginModule)
        },
        { path: "", redirectTo: "/users", pathMatch: "full" }
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
    NgrxSharedModule,
    AuthModule.forRoot({
      apiUrl: "http://localhost:8102/auth",
      clientId: "client1"
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
