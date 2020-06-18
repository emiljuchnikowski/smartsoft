import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";
import {text} from "@storybook/addon-knobs";
import {IonicModule} from "@ionic/angular";

import {config} from "../../test";
import {StreamModule} from "../../stream.module";
import {SenderComponent} from "./sender.component";

storiesOf('smart-stream-sender', module)
    .add('basic', () => ({
        moduleMetadata: {
            imports: [
                StreamModule.forFeature(config),
                TranslateModule.forRoot(),
                IonicModule.forRoot()
            ]
        },
        component: SenderComponent,
        props: {
            id: text('id', 'f7d80183-6553-ebf3-6d15-e11a4504a5a7')
        }
    }))
