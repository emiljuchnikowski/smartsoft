import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";
import {of} from "rxjs";

import {FieldType, Field, Model} from "@smartsoft001/models";

import {SharedFactoriesModule} from "../../factories";
import {COMPONENTS, IMPORTS} from "../components.module";
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
            imports: [...IMPORTS, SharedFactoriesModule, TranslateModule.forRoot()],
            declarations: COMPONENTS
        },
        component: DetailsComponent,
        props: {
            options: {
                type: TestModel,
                item$: of(new TestModel())
            } as IDetailsOptions<any>
        }
    }))
