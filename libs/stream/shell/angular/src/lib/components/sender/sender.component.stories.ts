import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {StreamComponentsModule} from "../components.module";

storiesOf('smart-stream-sender', module)
    .add('basic', () => ({
        moduleMetadata: {
            imports: [
                StreamComponentsModule,
                TranslateModule.forRoot()
            ]
        },
        template: `<smart-stream-sender></smart-stream-sender>`
    }))
