import { DynamicModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { MongoModule } from '@smartsoft001/mongo';

import { JwtStrategy } from './auth/jwt.strategy';
import { SharedConfig } from './shared.config';
import { PermissionService } from './auth/permission.service';
import { CONTROLLERS } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from './services';

export class SharedModule {
  static forFeature(config: SharedConfig): DynamicModule {
    return {
      module: SharedModule,
      providers: [
        { provide: SharedConfig, useValue: config },
        JwtStrategy,
        PermissionService,
      ],
      exports: [
        { provide: SharedConfig, useValue: config },
        PermissionService,
        JwtStrategy,
      ],
    };
  }

  static forRoot(
    config: SharedConfig & {
      db: {
        host: string;
        port: number;
        database: string;
        username?: string;
        password?: string;
      };
    }
  ): DynamicModule {
    return {
      module: SharedModule,
      controllers: [...CONTROLLERS],
      imports: [
        SharedModule.forFeature(config),
        MongoModule.forRoot({
          ...config.db,
          collection: '_app',
        }),
        TerminusModule.forRoot({
          errorLogStyle: 'json',
        }),
        HttpModule,
      ],
      providers: [...SERVICES],
      exports: [SharedModule.forFeature(config)],
    };
  }
}
