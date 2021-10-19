import {ApplicationRef, NgModuleRef, Type} from "@angular/core";

import {DynamicComponentType} from "../../models";

export class DynamicComponentStorageService {
    static get(key: DynamicComponentType, moduleRef: NgModuleRef<any>): Type<any>[] {
        const getComponents = (k: DynamicComponentType, m: NgModuleRef<any>): Type<any>[] => {
            return  m.instance.constructor['ɵmod'].declarations
                .filter(c => c['smartType'] === k)
        }

        let components = getComponents(key, moduleRef);

        if (!components.length) {
            const applicationRef = moduleRef.injector.get(ApplicationRef);
            const appComponentInjector = applicationRef.components
                .find(t => t.componentType.name === "AppComponent")?.injector;

            if (!appComponentInjector) {
                throw new Error(DynamicComponentStorageService.name + " not found AppComponent");
            }

            const appModuleRef = appComponentInjector.get(NgModuleRef);

            components = getComponents(key, appModuleRef);
        }

        return components;
    }
}