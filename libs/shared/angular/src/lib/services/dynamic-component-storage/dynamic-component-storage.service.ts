import {NgModuleRef, Type} from "@angular/core";
import {DynamicComponentType} from "@smartsoft001/angular";

export class DynamicComponentStorageService {
    static get(key: DynamicComponentType, moduleRef: NgModuleRef<any>): Type<any>[] {
        const components: Type<any>[] = moduleRef.instance.constructor['ɵmod'].declarations;
        return components.filter(c => c['smartType'] === key);
    }
}