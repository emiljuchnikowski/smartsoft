import {NgModule} from "@angular/core";

import {SenderComponent} from "./sender/sender.component";
import {ClientComponent} from "./client/client.component";
import {ChatComponent} from "./chat/chat.component";

const COMPONENTS = [
    SenderComponent,
    ClientComponent,
    ChatComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class StreamComponentsModule {

}
