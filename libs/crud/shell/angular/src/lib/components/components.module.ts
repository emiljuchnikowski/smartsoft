import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {SharedModule} from "@smartsoft001/angular";

import {ExportComponent} from "./export/export.component";
import {
    FilterComponent,
    FilterDateComponent,
    FilterDateWithEditComponent, FilterFlagComponent,
    FilterRadioComponent,
    FilterTextComponent,
    FilterCheckComponent
} from "./filter";
import {FiltersConfigComponent} from "./filters-config/filters-config.component";
import {FiltersComponent} from "./filters/filters.component";
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {SocketService} from "../services/socket/socket.service";
import {CrudPipesModule} from "../pipes/pipes.module";
import {CrudService} from "../services/crud/crud.service";
import {CrudEffects} from "../+state/crud.effects";
import {CrudFacade} from "../+state/crud.facade";
import {CrudListPaginationFactory} from "../factories/list-pagination/list-pagination.factory";

const COMPONENTS = [
    ExportComponent,
    FilterComponent,
    FilterTextComponent,
    FiltersConfigComponent,
    FilterDateComponent,
    FilterDateWithEditComponent,
    FilterRadioComponent,
    FiltersComponent,
    FilterFlagComponent,
    FilterCheckComponent,
    MultiselectComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    entryComponents: [
        ...COMPONENTS
    ],
    imports: [
        //AuthSharedModule,
        StoreModule,
        SharedModule,
        CrudPipesModule,
        SocketIoModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        CrudPipesModule,
        ...COMPONENTS
    ],
    providers: [
        CrudService,
        CrudEffects,
        CrudFacade,
        SocketService,
        CrudListPaginationFactory,
    ],
})
export class CrudComponentsModule { }