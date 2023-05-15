import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { Injectable } from "@nestjs/common";

import { IItemRepository } from '@smartsoft001/domain-core';

@Injectable()
export class HealthDbService extends HealthIndicator {
  constructor(private repository: IItemRepository<any>) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const dbKey = 'health';

    try {
      const item = await this.repository.getById(dbKey);
      const user = { username: '_' + key, permissions: [] };
      const update = {
        id: dbKey,
        checkDate: new Date(),
      };

      if (!item) {
        await this.repository.create(update, user);
      } else {
        await this.repository.updatePartial(update, user);
      }

      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError('Database check failed', e);
    }
  }
}
