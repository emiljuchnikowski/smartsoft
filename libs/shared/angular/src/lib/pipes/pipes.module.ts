import {NgModule} from "@angular/core";

import {EnumToListPipe} from "./enum-to-list/enum-to-list.pipe";
import {ListCellPipe} from "./list-cell/list-cell.pipe";
import {FileUrlPipe} from "./file-url/file-url.pipe";
import {ListHeaderPipe} from "./list-header/list-header.pipe";

export const PIPES = [
    EnumToListPipe, ListCellPipe, FileUrlPipe, ListHeaderPipe
];

@NgModule({
    declarations: [ ...PIPES ],
    exports: [ ...PIPES ]
})
export class SharedPipesModule {

}
