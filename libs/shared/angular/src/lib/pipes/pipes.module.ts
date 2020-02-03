import {NgModule} from "@angular/core";

import {EnumToListPipe} from "./enum-to-list/enum-to-list.pipe";

export const PIPES = [
    EnumToListPipe
];

@NgModule({
    declarations: [ ...PIPES ],
    exports: [ ...PIPES ]
})
export class SharedPipesModule {

}
