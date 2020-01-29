import {NgModule} from "@angular/core";

import {EditComponent} from "./edit/edit.component";
import {ListComponent} from "./list/list.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "@smartsoft001/angular";
import {CrudPipesModule} from "../pipes/pipes.module";

const PAGES = [
  EditComponent,
  ListComponent
];

@NgModule({
    declarations: [
        ...PAGES
    ],
    entryComponents: [
        ...PAGES
    ],
    exports: [
        ...PAGES
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: ListComponent}
            , {path: 'add', component: EditComponent}
            , {path: ':id', component: EditComponent}
        ]),
        CrudPipesModule
    ]
})
export class CrudPagesModule {

}
