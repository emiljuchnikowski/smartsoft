import {ModuleWithProviders, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {AuthConfig} from "./auth.config";

@NgModule({
    imports: [ HttpClientModule ]
})
export class AuthModule {
    static forRoot(config: AuthConfig): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                { provide: AuthConfig, useValue: config }
            ]
        }
    }
}
