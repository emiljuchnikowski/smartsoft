import {Column, Entity, ObjectIdColumn} from "typeorm";

import {IEntity} from "@smartsoft001/domain-core";

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
}

@Entity("streamComments")
export class StreamComment implements IEntity<string> {
    @ObjectIdColumn({ generated: false })
    id: string;

    @Column()
    body: string;

    @Column()
    streamId: string;

    @Column()
    username: string;

    @Column({
        type: 'boolean'
    })
    annonymus: boolean;

    @Column({
        type: "datetime"
    })
    createDate: Date;
}
