import {ModuleWithProviders, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";

import {CrudConfig, CrudFullConfig} from "./crud.config";
import {SERVICES} from "./services";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {CrudFacade} from "./+state/crud.facade";
import {IEntity} from "@smartsoft001/domain-core";
import {PIPES} from "./pipes";
import {CrudFullModule} from "./crud-full.module";
import {SharedModule} from "@smartsoft001/angular";

@NgModule({
    imports: [
        AuthSharedModule,
        StoreModule,
        SharedModule
    ],
    declarations: [
        ...PIPES
    ]
})
export class CrudModule<T extends IEntity<string>> {
    static forFeature<T extends IEntity<string>>(
        options: ICrudModuleOptionsWithRoutng<T> | ICrudModuleOptionsWithoutRoutng<T>
    ): ModuleWithProviders {
        return {
            ngModule: options.routing ? CrudFullModule : CrudModule,
            providers: [
                //{ provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
                { provide: CrudConfig, useValue: options.config },
                { provide: CrudFullConfig, useValue: options.config },
                ...SERVICES,
                CrudEffects,
                CrudFacade
            ]
        }
    }

    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}

export interface ICrudModuleOptionsWithRoutng<T> {
    config: CrudFullConfig<T>;
    routing: true
}

export interface ICrudModuleOptionsWithoutRoutng<T> {
    config: CrudConfig<T>;
    routing: false
}
