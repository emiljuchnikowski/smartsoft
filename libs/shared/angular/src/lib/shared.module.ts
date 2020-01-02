import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {COMPONENTS} from "./components";
import {FACTORIES} from "./factories";
import {setDefaultTranslationsAndLang} from "./translations-default";

@NgModule({
    providers: [ ...FACTORIES ],
    declarations: [ ...COMPONENTS ],
    entryComponents: [ ...COMPONENTS ],
    imports: [ReactiveFormsModule, IonicModule, CommonModule, TranslateModule],
    exports: [ReactiveFormsModule, IonicModule, ...COMPONENTS, TranslateModule]
})
export class SharedModule {
    constructor(translateService: TranslateService) {
        setDefaultTranslationsAndLang(translateService);
    }
}
