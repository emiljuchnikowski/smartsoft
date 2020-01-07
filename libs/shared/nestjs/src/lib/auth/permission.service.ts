import {Injectable} from "@nestjs/common";

import {PermissionType, SharedConfig} from "../shared.config";
import {DomainForbiddenError} from "@smartsoft001/domain-core";
import {IUser} from "@smartsoft001/users";

@Injectable()
export class PermissionService {
    constructor(private config: SharedConfig) { }

    valid(type: PermissionType, user: IUser): void {
        if (!this.config.permissions) return;

        const typeConfig = this.config.permissions[type];

        if (!typeConfig) return;

        if (!user.permissions)
            throw new DomainForbiddenError(`Context forbidden`);

        if (!typeConfig.some(tc => user.permissions.some(up => tc === up)))
            throw new DomainForbiddenError(`Context forbidden`);
    }
}
