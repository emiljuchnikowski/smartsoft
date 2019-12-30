import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

import {AppSplitPanelComponent, COMPONENTS} from "./components";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ ...COMPONENTS ],
    entryComponents: [ ...COMPONENTS ],
    imports: [ReactiveFormsModule, IonicModule, CommonModule],
    exports: [ReactiveFormsModule, IonicModule, AppSplitPanelComponent]
})
export class SharedModule { }
