import {storiesOf} from "@storybook/angular";

import {StreamComponentsModule} from "../components.module";
import {ClientComponent} from "./client.component";

storiesOf("smart-stream-client", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [ StreamComponentsModule]
        },
        component: ClientComponent
    }))
