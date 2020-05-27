import {storiesOf} from "@storybook/angular";

import {StreamComponentsModule} from "../components.module";
import {ChatComponent} from "./chat.component";

storiesOf("smart-stream-chat", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [ StreamComponentsModule ]
        },
        component: ChatComponent
    }))
