import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {ClientComponent} from "./client.component";
import {config} from "../../test";
import {StreamModule} from "../../stream.module";
import {text} from "@storybook/addon-knobs";

storiesOf("smart-stream-client", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [
                StreamModule.forFeature(config),
                TranslateModule.forRoot()
            ]
        },
        component: ClientComponent,
        props: {
            id: text('id', 'f7d80183-6553-ebf3-6d15-e11a4504a5a7')
        }
    }))
