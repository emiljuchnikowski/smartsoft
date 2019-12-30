import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {IonicModule} from "@ionic/angular";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import {SharedModule} from "@smartsoft001/angular";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }],
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
      IonicModule.forRoot(),
    EffectsModule.forRoot([]),
    SharedModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
