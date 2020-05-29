import {Column, Entity, ObjectIdColumn} from "typeorm";

import {IEntity} from "@smartsoft001/domain-core";

import {StreamComment} from "../value-objects";

@Entity("streams")
export class Stream implements IEntity<string> {
    @ObjectIdColumn({ generated: false })
    id: string;

    @Column()
    title: string;

    @Column()
    desciption: number;

    @Column({
        type: "datetime"
    })
    createDate: Date;

    @Column({
        type: "datetime"
    })
    modifyDate: Date;

    @Column()
    comments: Array<StreamComment>;
}
