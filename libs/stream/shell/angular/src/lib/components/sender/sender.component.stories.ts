import {storiesOf} from "@storybook/angular";

import {StreamComponentsModule} from "../components.module";

storiesOf('smart-stream-sender', module)
    .add('basic', () => ({
        moduleMetadata: {
            imports: [ StreamComponentsModule ]
        },
        template: `<smart-stream-sender></smart-stream-sender>`
    }))
