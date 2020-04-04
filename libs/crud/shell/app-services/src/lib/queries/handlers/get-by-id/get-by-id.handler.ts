import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { GetByIdQuery } from "../../get-by-id.query";
import { PermissionService } from "@smartsoft001/nestjs";
import { IEntity, IItemRepository } from "@smartsoft001/domain-core";

@QueryHandler(GetByIdQuery)
export class GetByIdHandler<T extends IEntity<string>>
  implements IQueryHandler<GetByIdQuery> {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly repository: IItemRepository<T>
  ) {}

  async execute(query: GetByIdQuery): Promise<T> {
    try {
      this.permissionService.valid("read", query.user);
      const result = await this.repository.getById(query.id);
      delete result['password'];

      return result;
    } catch (e) {
      console.error(e);
    }
  }
}
