import {NgModule} from "@angular/core";

import {EnumToListPipe} from "./enum-to-list/enum-to-list.pipe";
import {ListCellPipe} from "./list-cell/list-cell.pipe";

export const PIPES = [
    EnumToListPipe, ListCellPipe
];

@NgModule({
    declarations: [ ...PIPES ],
    exports: [ ...PIPES ]
})
export class SharedPipesModule {

}
