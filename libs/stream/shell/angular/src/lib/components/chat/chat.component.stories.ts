import {storiesOf} from "@storybook/angular";
import {TranslateModule} from "@ngx-translate/core";
// @ts-ignore
import moment from "moment";

import {ChatComponent} from "./chat.component";
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
        component: ChatComponent,
        props: {
            comments: [
                {
                    body: "test 2",
                    createDate: moment('2020-01-01 12:01:00').toDate(),
                    username: 'user 2'
                },
                {
                    body: "test 1",
                    createDate: moment('2020-01-01 12:00:00').toDate(),
                    username: 'user 1'
                }
            ]
        }
    }))
