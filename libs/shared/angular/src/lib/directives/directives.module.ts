import {NgModule} from "@angular/core";

import {SharedServicesModule} from "../services/services.module";
import {DetailsDirective} from "./details/details.directive";
import {DateValidator} from "./date-validator/date-validator.directive";
import {DynamicContentDirective} from "./dynamic-content/dynamic-content.directive";

const DIRECTIVES = [
    DetailsDirective,
    DateValidator,
    DynamicContentDirective
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
