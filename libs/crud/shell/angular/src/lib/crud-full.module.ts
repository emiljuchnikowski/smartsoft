import {NgModule} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";

import {CrudConfig} from "./crud.config";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {IEntity} from "@smartsoft001/domain-core";
import {SharedModule} from "@smartsoft001/angular";
import {CrudPipesModule} from "./pipes/pipes.module";
import {CrudPagesModule} from "./pages/pages.module";
import {HttpClientModule} from "@angular/common/http";
import {CrudServicesModule} from "./services/services.module";
import {CrudStateModule} from "./+state/state.module";

@NgModule({
    imports: [
        AuthSharedModule,
        StoreModule,
        SharedModule,
        CrudPagesModule,
        HttpClientModule,
        CrudPipesModule,
        CrudServicesModule,
        CrudStateModule
    ],
    exports: [
        CrudPipesModule,
        CrudPagesModule
    ]
})
export class CrudFullModule<T extends IEntity<string>> {
    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
