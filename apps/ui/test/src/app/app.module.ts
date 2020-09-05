import { NgModule } from "@angular/core";
import { StoreRouterConnectingModule, DefaultRouterStateSerializer } from "@ngrx/router-store";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";

// required
import { IonicModule } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { NgrxSharedModule, SharedModule } from "@smartsoft001/angular";
import { AuthModule, PermissionsGuard } from "@smartsoft001/auth-shell-angular";
import { HttpClientModule } from "@angular/common/http";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {Todo} from "./todos/todo.dto";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: "trans",
          loadChildren: () =>
            import("./trans/trans.module").then(m => m.TransModule)
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
          path: "todos",
          canActivate: [PermissionsGuard],
          data: {
            expectedPermissions: ["admin"]
          },
          loadChildren: () =>
            import("./todos/todos.module").then(m => m.TodosModule)
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
          strictActionImmutability: false,
          strictStateImmutability: false
        }
      }
    ),
    HttpClientModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    EffectsModule.forRoot([]),
    SharedModule,
    AuthModule.forRoot({
      apiUrl: environment.apiUrl + "auth",
      clientId: "admin"
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),
    SharedModule,
    NgrxSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
