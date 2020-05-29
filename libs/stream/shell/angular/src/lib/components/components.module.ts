import {ModuleWithProviders, NgModule} from "@angular/core";
import {SharedModule} from "@smartsoft001/angular";

import {SenderComponent} from "./sender/sender.component";
import {ClientComponent} from "./client/client.component";
import {ChatComponent} from "./chat/chat.component";
import {StreamConfig} from "../stream.config";

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
        SharedModule
    ]
})
export class StreamComponentsModule {
    static forRoot(config: StreamConfig): ModuleWithProviders {
        return {
            ngModule: StreamComponentsModule,
            providers: [
                { provide: StreamConfig, useValue: config }
            ]
        }
    }
}
