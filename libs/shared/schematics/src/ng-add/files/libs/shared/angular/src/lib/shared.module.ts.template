import {NgModule} from "@angular/core";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {CrudFacade, CrudModule, CrudService} from "@smartsoft001/crud-shell-angular";
import { SharedModule as SmartSharedModule } from "@smartsoft001/angular";

import {Config} from "@<%= projectName %>/shared/models";

import {environment} from "./environments/environment";
import {DIRECTIVES} from "./directives";
import {COMPONENTS} from "./components";
import {SERVICES} from "./services";

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    providers: [
        ...SERVICES
    ],
    imports: [
        AuthSharedModule,
        SmartSharedModule,
        CrudModule.forFeature({
            routing: false,
            config: {
                type: Config,
                entity: "configs",
                apiUrl: environment.apiUrl + "configs",
            },
        }),
    ],
    exports: [
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class ConfigsModule { }

@NgModule({
    exports: [
        ConfigsModule,
        AuthSharedModule,
        SmartSharedModule,
    ]
})
export class SharedModule {

}