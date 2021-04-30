import {ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { Store, StoreModule } from "@ngrx/store";
import { SocketIoModule } from "ngx-socket-io";

import { IEntity } from "@smartsoft001/domain-core";
import {FILE_SERVICE_CONFIG, IFileServiceConfig, SharedModule} from "@smartsoft001/angular";

import { CrudConfig, CrudFullConfig } from "./crud.config";
import { CrudEffects } from "./+state/crud.effects";
import { getReducer } from "./+state/crud.reducer";
import { CrudService } from "./services/crud/crud.service";
import { CrudFacade } from "./+state/crud.facade";
import { CrudPipesModule } from "./pipes/pipes.module";
import { CrudFullModule } from "./crud-full.module";
import { SocketService } from "./services/socket/socket.service";
import {CrudListPaginationFactory} from "./factories/list-pagination/list-pagination.factory";

@NgModule({
  imports: [
    //AuthSharedModule,
    StoreModule,
    SharedModule,
    CrudPipesModule,
    SocketIoModule
  ],
  exports: [CrudPipesModule],
  providers: [CrudService, CrudEffects, CrudFacade, SocketService, CrudListPaginationFactory]
})
export class CrudModule<T extends IEntity<string>> {
  static forFeature<T extends IEntity<string>>(
    options:
      | ICrudModuleOptionsWithRoutng<T>
      | ICrudModuleOptionsWithoutRoutng<T>
  ): ModuleWithProviders<CrudModule<any>> {
    return {
      ngModule: options.routing ? CrudFullModule : CrudModule,
      providers: [
        { provide: CrudConfig, useValue: options.config },
        { provide: CrudFullConfig, useValue: options.config },
        { provide: FILE_SERVICE_CONFIG, useValue: { apiUrl: options.config.apiUrl } as IFileServiceConfig },
          ...(options.socket ? [] : [ SocketService ])
      ]
    };
  }

  constructor(
    store: Store<any>,
    config: CrudConfig<T>,
    effects: CrudEffects<any>
  ) {
    store.addReducer(config.entity, getReducer(config.entity));
    effects.init();
  }
}

export interface ICrudModuleOptionsWithRoutng<T> {
  config: CrudFullConfig<T>;
  socket?: boolean;
  routing: true;
}

export interface ICrudModuleOptionsWithoutRoutng<T> {
  config: CrudConfig<T>;
  socket?: boolean;
  routing: false;
}
