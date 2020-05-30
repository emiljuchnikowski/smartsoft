import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {StreamComponentsModule} from "../components.module";
import {config} from "../../test";

storiesOf('smart-stream-sender', module)
    .add('basic', () => ({
        moduleMetadata: {
            imports: [
                StreamComponentsModule.forRoot(config),
                TranslateModule.forRoot()
            ]
        },
        template: `<smart-stream-sender></smart-stream-sender>`
    }))
