import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Store, StoreModule} from "@ngrx/store";
import {SocketIoModule} from "ngx-socket-io";

import {SharedModule} from "@smartsoft001/angular";
import {IEntity} from "@smartsoft001/domain-core";

import {CrudConfig} from "./crud.config";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {ListComponent} from "./pages/list/list.component";
import {ItemComponent} from "./pages/item/item.component";
import {CrudPipesModule} from "./pipes/pipes.module";
import { CrudService } from './services/crud/crud.service';
import { CrudFacade } from './+state/crud.facade';
import {SocketService} from "./services/socket/socket.service";
import {ExportComponent} from "./components/export/export.component";

@NgModule({
    declarations: [
        ItemComponent,
        ListComponent,
        ExportComponent
    ],
    entryComponents: [
        ItemComponent,
        ListComponent,
        ExportComponent
    ],
    imports: [
        StoreModule,
        SharedModule,
        CrudPipesModule,
        SocketIoModule,
        RouterModule.forChild([
            {path: '', component: ListComponent}
            , {path: 'add', component: ItemComponent}
            , {path: ':id', component: ItemComponent}
        ])
    ],
    exports: [
        ItemComponent,
        ListComponent,
        ExportComponent,
        CrudPipesModule
    ],
    providers: [CrudService, CrudEffects, CrudFacade, SocketService]
})
export class CrudFullModule<T extends IEntity<string>> {
    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
