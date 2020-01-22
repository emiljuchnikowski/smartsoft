import {NgModule} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";

import {CrudConfig} from "./crud.config";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {IEntity} from "@smartsoft001/domain-core";
import {RouterModule} from "@angular/router";
import {ListComponent, PAGES} from "./pages";
import {SharedModule} from "@smartsoft001/angular";
import {EditComponent} from "./pages/edit/edit.component";
import {PIPES} from "./pipes";

@NgModule({
    imports: [
        AuthSharedModule,
        StoreModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: ListComponent }
            ,{ path: 'add', component: EditComponent }
            ,{ path: ':id', component: EditComponent }
        ])
    ],
    declarations: [
        ...PAGES,
        ...PIPES
    ],
    entryComponents: [
        ...PAGES
    ]
})
export class CrudFullModule<T extends IEntity<string>> {
    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
