import {FORM_COMPONENTS} from "./form";
import {APP_COMPONENTS} from "./app";
import {PAGE_COMPONENTS} from "./page";

export * from './form';
export * from './app';
export * from './page';

export const COMPONENTS = [
    ...FORM_COMPONENTS,
    ...APP_COMPONENTS,
    ...PAGE_COMPONENTS
];
