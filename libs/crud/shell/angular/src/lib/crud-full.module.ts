import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Store, StoreModule} from "@ngrx/store";

import {CrudConfig} from "./crud.config";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {SharedModule} from "@smartsoft001/angular";
import {ListComponent} from "./pages/list/list.component";
import {EditComponent} from "./pages/edit/edit.component";
import {CrudPipesModule} from "./pipes/pipes.module";
import {IEntity} from "@smartsoft001/domain-core";
import { CrudService } from './services/crud/crud.service';
import { CrudFacade } from './+state/crud.facade';

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
    ],
    providers: [CrudService, CrudEffects, CrudFacade]
})
export class CrudFullModule<T extends IEntity<string>> {
    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
