import {storiesOf} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {ChartsModule} from "ng2-charts";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of} from "rxjs";

import {FieldType, Field, Model} from "@smartsoft001/models";

import {SharedPipesModule} from "../../pipes";
import {SharedDirectivesModule} from "../../directives";
import {SharedFactoriesModule} from "../../factories";
import {COMPONENTS} from "../components.module";
import {IDetailsOptions} from "../../models";
import {DetailsComponent} from "./details.component";

@Model({})
class TestModel {
    @Field({
        details: true,
        type: FieldType.strings
    })
    strings = [ "test1", "test2" ];
}

storiesOf('smart-details', module)
    .add('all', () => ({
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
        component: DetailsComponent,
        props: {
            options: {
                type: TestModel,
                item$: of(new TestModel())
            } as IDetailsOptions<any>
        }
    }))
