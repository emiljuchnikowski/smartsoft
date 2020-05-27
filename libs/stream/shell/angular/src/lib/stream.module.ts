import {ModuleWithProviders, NgModule} from "@angular/core";

import {StreamConfig} from "./stream.config";
import {StreamComponentsModule} from "./components/components.module";

@NgModule({
    exports: [
        StreamComponentsModule
    ],
    imports: [
        StreamComponentsModule
    ],
    declarations: []
})
export class StreamModule {
    static forFeature(config: StreamConfig): ModuleWithProviders {
        return {
            ngModule: StreamModule,
            providers: [
                { provide: StreamConfig, useValue: config }
            ]
        }
    }
}
