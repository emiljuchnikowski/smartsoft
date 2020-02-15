import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";

import {IEntity} from "@smartsoft001/domain-core";

@Entity('trans')
export class Trans<T> implements IEntity<string> {
    @PrimaryColumn({ name: '_id' })
    id: string;

    @Column('amount')
    amount: number;

    @Column({
        type: 'json',
        name: 'data'
    })
    data: T;

    @Column('system')
    system: TransSystem;

    @Column('status')
    status: TransStatus = 'prepare';

    @Column('modifyDate')
    modifyDate: Date;

    @OneToMany(() => TransHistory, his => his.trans)
    history: TransHistory<T>[];
}

@Entity('transHistory')
export class TransHistory<T> {
    @PrimaryColumn({ name: '_id' })
    id: string;

    @Column('amount')
    amount: number;

    @Column({
        type: 'json',
        name: 'data'
    })
    data: any;

    @Column('system')
    system: TransSystem;

    @Column('status')
    status: TransStatus = 'prepare';

    @Column('modifyDate')
    modifyDate: Date;

    @ManyToOne(() => Trans, t => t.history)
    trans: Trans<T>;
}

export type TransSystem = 'payu';
export type TransStatus = 'prepare' | 'new';

export const TRANS_SYSTEMS = [ 'payu' ];
