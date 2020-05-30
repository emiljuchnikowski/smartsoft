import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {StreamComponentsModule} from "../components.module";
import {config} from "../../test";

storiesOf("smart-stream-chat", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [
                TranslateModule.forRoot(),
                StreamComponentsModule.forRoot(config)
            ]
        },
        template: `<smart-stream-chat></smart-stream-chat>`
    }))
