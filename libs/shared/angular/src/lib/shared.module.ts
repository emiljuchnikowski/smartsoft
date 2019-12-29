import {ModuleWithProviders, NgModule} from "@angular/core";

import {COMPONENTS} from "./components";

@NgModule({
    declarations: [ ...COMPONENTS ],
    entryComponents: [ ...COMPONENTS ]
})
export class SharedModule {
    forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}
