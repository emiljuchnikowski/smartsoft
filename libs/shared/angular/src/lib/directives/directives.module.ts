import {NgModule} from "@angular/core";

import {SharedServicesModule} from "../services/services.module";
import {DetailsDirective} from "./details/details.directive";

const DIRECTIVES = [
    DetailsDirective
];

@NgModule({
    imports: [
        SharedServicesModule
    ],
    declarations: [
        ...DIRECTIVES
    ],
    exports: [
        ...DIRECTIVES
    ]
})
export class SharedDirectivesModule {

}
