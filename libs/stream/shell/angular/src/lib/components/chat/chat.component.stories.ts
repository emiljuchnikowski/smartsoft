import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {StreamComponentsModule} from "../components.module";

storiesOf("smart-stream-chat", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [
                TranslateModule.forRoot(),
                StreamComponentsModule
            ]
        },
        template: `<smart-stream-chat></smart-stream-chat>`
    }))
