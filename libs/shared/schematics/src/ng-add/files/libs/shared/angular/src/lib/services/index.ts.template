import {CrudFacade, CrudService} from "@smartsoft001/crud-shell-angular";

import {StyleService} from "./style/style.service";
import {ConfigsFacade} from "../+state/configs.facade";
import {ConfigsService} from "./configs/configs.service";

export * from "./style/style.service";
export * from "./configs/configs.service";

export const SERVICES = [
    StyleService,
    ConfigsFacade,
    {
        provide: CrudFacade,
        useClass: ConfigsFacade
    },
    {
        provide: CrudService,
        useClass: ConfigsService
    }
];