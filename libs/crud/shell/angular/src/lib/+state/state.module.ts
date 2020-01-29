import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";

import {CrudEffects} from "./crud.effects";
import {CrudFacade} from "./crud.facade";
import {CrudServicesModule} from "../services/services.module";

const PROVIDERS = [
  CrudEffects, CrudFacade
];

@NgModule({
    imports: [
      CrudServicesModule,
      StoreModule
    ],
    providers: [
        ...PROVIDERS
    ]
})
export class CrudStateModule {

}
