import { NgModule } from "@angular/core";
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from "@ngrx/router-store";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";

// required
import { IonicModule } from "@ionic/angular";

import {AppComponent, TestComponent} from "./app.component";
import { environment } from "../environments/environment";
import { NgrxSharedModule, SharedModule } from "@smartsoft001/angular";
import {
  AUTH_REQUEST_BODY_PROVIDER,
  AuthModule, PermissionsGuard,
} from "@smartsoft001/auth-shell-angular";
import { HttpClientModule } from "@angular/common/http";
import {CUSTOM_COMPONENTS, CustomButtonComponent, CustomFormComponent, CustomPageComponent} from "./custom";

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        // {
        //   path: "trans",
        //   loadChildren: () =>
        //     import("./trans/trans.module").then((m) => m.TransModule),
        // },
        // {
        //   path: "users",
        //   canActivate: [PermissionsGuard],
        //   data: {
        //     expectedPermissions: ["admin"],
        //   },
        //   loadChildren: () =>
        //     import("./users/users.module").then((m) => m.UsersModule),
        // },
        {
          path: "todos",
          canActivate: [PermissionsGuard],
          data: {
            expectedPermissions: ["admin"],
          },
          loadChildren: () =>
            import("./todos/todos.module").then((m) => m.TodosModule),
        },
        {
          path: "login",
          loadChildren: () =>
            import("./login/login.module").then((m) => m.LoginModule),
        },
        { path: "", redirectTo: "/todos", pathMatch: "full" },
      ],
      { initialNavigation: "enabled", useHash: true, relativeLinkResolution: 'legacy' }
    ),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: false,
          strictStateImmutability: false,
        },
      }
    ),
    HttpClientModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    EffectsModule.forRoot([]),
    SharedModule,
    AuthModule.forRoot({
      apiUrl:  environment.apiUrl + "auth",
      clientId: "admin",
      facebookId: "813277462877495",
      googleId: "103834343078-o736d22f2diersc4k6nge3uc4rtof6s1.apps.googleusercontent.com"
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    NgrxSharedModule,
  ],

  providers: [
    {
      provide: AUTH_REQUEST_BODY_PROVIDER,
      useValue: {
        get: async (baseBody) => {
          return {
            ...baseBody,
            test: "test",
          };
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
