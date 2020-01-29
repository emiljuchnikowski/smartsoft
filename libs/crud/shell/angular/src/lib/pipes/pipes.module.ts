import {NgModule} from "@angular/core";

import {FormOptionsPipe} from "./form-options/form-options.pipe";

const PIPES = [
    FormOptionsPipe
];

@NgModule({
    declarations: [
        PIPES
    ],
    exports: [
        PIPES
    ]
})
export class CrudPipesModule {

}
