import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";

import {ErrorEffects} from "./+state/error.effects";

@NgModule({
    imports: [
        EffectsModule.forFeature([ ErrorEffects ]),
        StoreModule.forFeature('router', routerReducer)
    ]
})
export class NgrxSharedModule { }
