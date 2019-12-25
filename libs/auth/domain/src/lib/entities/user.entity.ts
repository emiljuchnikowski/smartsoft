import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

import {IEntity} from "@smartsoft001/shared-domain-core";
import {IUser, IUserCredentials} from "@smartsoft001/shared-users";

@Entity('users')
export class User implements IEntity<string>, IUser, IUserCredentials {

    @PrimaryGeneratedColumn()
    id: string;

    @Column("permissions")
    permissions: Array<string>;

    @Column("username")
    username: string;

    @Column("password")
    password: string;

    @Column("disabled")
    disabled: boolean;

    @Column("authRefreshToken")
    authRefreshToken: string;

}
