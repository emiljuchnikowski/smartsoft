import {NgModule} from "@angular/core";

import {EnumToListPipe} from "./enum-to-list/enum-to-list.pipe";

@NgModule({
    declarations: [ EnumToListPipe ],
    exports: [ EnumToListPipe ]
})
export class SharedPipesModule {

}
