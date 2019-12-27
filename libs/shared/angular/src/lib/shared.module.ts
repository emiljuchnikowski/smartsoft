import {ModuleWithProviders, NgModule} from "@angular/core";

@NgModule({ })
export class SharedModule {
    forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}
