import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";
import {text} from "@storybook/addon-knobs";

import {config} from "../../test";
import {StreamModule} from "../../stream.module";
import {SenderComponent} from "./sender.component";


storiesOf('smart-stream-sender', module)
    .add('basic', () => ({
        moduleMetadata: {
            imports: [
                StreamModule.forFeature(config),
                TranslateModule.forRoot()
            ]
        },
        component: SenderComponent,
        props: {
            id: text('id', '14cfebc9-0fea-d7d0-5b5f-0c4f8e75ea69')
        }
    }))
