import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

import {COMPONENTS} from "./components";
import {FACTORIES} from "./factories";

@NgModule({
    providers: [ ...FACTORIES ],
    declarations: [ ...COMPONENTS ],
    entryComponents: [ ...COMPONENTS ],
    imports: [ReactiveFormsModule, IonicModule, CommonModule],
    exports: [ReactiveFormsModule, IonicModule, ...COMPONENTS]
})
export class SharedModule { }
