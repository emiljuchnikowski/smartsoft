import {NgModule} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";

import {CrudConfig} from "./crud.config";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {IEntity} from "@smartsoft001/domain-core";
import {SharedModule} from "@smartsoft001/angular";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ListComponent} from "./pages/list/list.component";
import {EditComponent} from "./pages/edit/edit.component";
import {CrudPipesModule} from "./pipes/pipes.module";

@NgModule({
    declarations: [
        EditComponent,
        ListComponent
    ],
    entryComponents: [
        EditComponent,
        ListComponent
    ],
    imports: [
        AuthSharedModule,
        StoreModule,
        SharedModule,
        CrudPipesModule,
        HttpClientModule,
        RouterModule.forChild([
            {path: '', component: ListComponent}
            , {path: 'add', component: EditComponent}
            , {path: ':id', component: EditComponent}
        ])
    ],
    exports: [
        EditComponent,
        ListComponent,
        CrudPipesModule
    ]
})
export class CrudFullModule<T extends IEntity<string>> {
    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
