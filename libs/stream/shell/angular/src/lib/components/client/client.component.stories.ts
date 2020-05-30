import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";

import {StreamComponentsModule} from "../components.module";
import {ClientComponent} from "./client.component";
import {config} from "../../test";

storiesOf("smart-stream-client", module)
    .add("basic", () => ({
        moduleMetadata: {
            imports: [
                StreamComponentsModule.forRoot(config),
                TranslateModule.forRoot()
            ]
        },
        component: ClientComponent
    }))
