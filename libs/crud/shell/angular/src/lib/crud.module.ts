import {ModuleWithProviders, NgModule} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";

import {CrudConfig} from "./crud.config";
import {SERVICES} from "./services";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";

@NgModule({
    imports: [
        AuthSharedModule,
        StoreModule
    ]
})
export class CrudModule {
    static forFeature(config: CrudConfig): ModuleWithProviders {
        return {
            ngModule: CrudModule,
            providers: [
                { provide: CrudConfig, useValue: config },
                ...SERVICES,
                CrudEffects
            ]
        }
    }

    constructor(store: Store<any>, config: CrudConfig, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
