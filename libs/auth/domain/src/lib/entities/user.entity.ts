import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

import {IEntity} from "@smartsoft001/shared-domain-core";
import {IUser} from "@smartsoft001/shared-users";

@Entity('users')
export class User implements IEntity<string>, IUser {

    @PrimaryGeneratedColumn()
    id: string;

    @Column("permissions")
    permissions: Array<string>;

    @Column("username")
    username: string;

    @Column("password")
    password: string;

    @Column("authRefreshToken")
    authRefreshToken: string;

}
