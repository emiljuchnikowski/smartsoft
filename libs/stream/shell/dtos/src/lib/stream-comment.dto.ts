import {Field, Model} from "@smartsoft001/models";

import {IStreamComment} from "./interfaces";

@Model({})
export class StreamComment implements IStreamComment {
    annonimus: boolean;
    @Field({ list: true }) body: string;
    @Field({ list: true }) createDate: Date;
    @Field({ list: true }) username: string;
}
