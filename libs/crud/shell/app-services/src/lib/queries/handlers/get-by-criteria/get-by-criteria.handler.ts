import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PermissionService } from "@smartsoft001/nestjs";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";
import {GetByCriteriaQuery} from "../../get-by-criteria.query";

@QueryHandler(GetByCriteriaQuery)
export class GetByCriteriaHandler<T extends IEntity<string>>
    implements IQueryHandler<GetByCriteriaQuery> {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly repository: IItemRepository<T>
    ) {}

    async execute(query: GetByCriteriaQuery): Promise<{ data: T[], totalCount: number }> {
        try {
            this.permissionService.valid("read", query.user);
            const result = await this.repository.getByCriteria(query.criteria, query.options);
            result.data.forEach(item => delete item['password']);

            return result;
        } catch (e) {
            console.error(e);
        }
    }
}
