import {ListComponent} from "./list.component";
import {ListMobileComponent} from "./mobile/mobile.component";
import {ListDesktopComponent} from "./desktop/desktop.component";

export * from './list.component';
export * from './mobile/mobile.component';
export * from './desktop/desktop.component';

export const LIST_COMPONENTS = [
    ListComponent,
    ListMobileComponent,
    ListDesktopComponent
];
