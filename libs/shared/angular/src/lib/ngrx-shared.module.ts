import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";

import {ErrorEffects} from "./+state/error.effects";
import {SharedModule} from "./shared.module";

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forFeature('router', routerReducer),
        EffectsModule.forFeature([ ErrorEffects ])
    ]
})
export class NgrxSharedModule { }
