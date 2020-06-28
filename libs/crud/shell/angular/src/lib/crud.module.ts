import { ModuleWithProviders, NgModule } from "@angular/core";
import { Store, StoreModule } from "@ngrx/store";
import { SocketIoModule } from "ngx-socket-io";

import { IEntity } from "@smartsoft001/domain-core";
import { SharedModule } from "@smartsoft001/angular";

import { CrudConfig, CrudFullConfig } from "./crud.config";
import { CrudEffects } from "./+state/crud.effects";
import { getReducer } from "./+state/crud.reducer";
import { CrudService } from "./services/crud/crud.service";
import { CrudFacade } from "./+state/crud.facade";
import { CrudPipesModule } from "./pipes/pipes.module";
import { CrudFullModule } from "./crud-full.module";
import { SocketService } from "./services/socket/socket.service";
import {ExportComponent} from "./components/export/export.component";

export const COMPONENTS = [
  ExportComponent
];

@NgModule({
  imports: [
    //AuthSharedModule,
    StoreModule,
    SharedModule,
    CrudPipesModule,
    SocketIoModule
  ],
  declarations: [
    COMPONENTS
  ],
  entryComponents: [
    COMPONENTS
  ],
  exports: [CrudPipesModule],
  providers: [CrudService, CrudEffects, CrudFacade, SocketService]
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
        { provide: CrudFullConfig, useValue: options.config }
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
  routing: true;
}

export interface ICrudModuleOptionsWithoutRoutng<T> {
  config: CrudConfig<T>;
  routing: false;
}
