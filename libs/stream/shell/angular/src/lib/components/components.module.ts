import { NgModule } from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {SharedModule} from "@smartsoft001/angular";

import {StreamProvider} from "../providers/stream/stream.provider";
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
    exports: [...COMPONENTS],
    imports: [
        SharedModule,
        HttpClientModule
    ],
    providers: [ StreamProvider ]
})
export class StreamComponentsModule {

}
