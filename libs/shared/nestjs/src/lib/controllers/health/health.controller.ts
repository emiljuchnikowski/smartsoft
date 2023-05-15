import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { HealthDbService } from "../../services";

@Controller('_app/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private custom: HealthDbService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.custom.isHealthy('database'),
    ]);
  }
}
