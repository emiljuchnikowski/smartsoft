import {NgModule} from "@angular/core";

import {SenderComponent} from "./sender/sender.component";

const COMPONENTS = [
    SenderComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class StreamComponentsModule {

}
