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
            id: text('id', '14cfebc9-0fea-d7d0-5b5f-0c4f8e75ea69')
        }
    }))
