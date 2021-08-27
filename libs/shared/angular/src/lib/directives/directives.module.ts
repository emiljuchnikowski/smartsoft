import {NgModule} from "@angular/core";

import {SharedServicesModule} from "../services/services.module";
import {DetailsDirective} from "./details/details.directive";
import {DateValidator} from "./date-validator/date-validator.directive";

const DIRECTIVES = [
    DetailsDirective,
    DateValidator
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
