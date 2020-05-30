import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {StreamModule} from "../../stream.module";
import {config} from "../../test";

storiesOf("smart-stream-chat", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [
                TranslateModule.forRoot(),
                StreamModule.forFeature(config)
            ]
        },
        template: `<smart-stream-chat></smart-stream-chat>`
    }))
