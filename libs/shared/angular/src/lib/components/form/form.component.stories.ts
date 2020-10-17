import {storiesOf} from "@storybook/angular";
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {ChartsModule} from "ng2-charts";

import {
    COMPONENTS,
    FormComponent,
    IFormOptions,
    SharedDirectivesModule,
    SharedFactoriesModule,
    SharedPipesModule
} from "@smartsoft001/angular";
import {Field, FieldType, Model} from "@smartsoft001/models";

@Model({})
class TestModel {
    @Field({
        required: true,
        type: FieldType.nip
    })
    nip: string;
}

storiesOf('smart-form/input', module)
    .add('nip', () => ({
        moduleMetadata: {
            imports: [
                CommonModule,
                IonicModule,
                ReactiveFormsModule,
                TranslateModule.forRoot(),
                RouterModule,
                SharedPipesModule,
                SharedDirectivesModule,
                HttpClientModule,
                MatTableModule,
                MatSortModule,
                ChartsModule,
                SharedFactoriesModule
            ],
            declarations: [
                ...COMPONENTS
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        },
        component: FormComponent,
        props: {
            options: {
                model: new TestModel()
            } as IFormOptions<any>
        }
    }));
