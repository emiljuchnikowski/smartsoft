import {FORM_COMPONENTS} from "./form";
import {APP_COMPONENTS} from "./app";
import {PAGE_COMPONENTS} from "./page";
import {INPUT_COMPONENTS} from "./input";

export * from './form';
export * from './app';
export * from './page';
export * from './input';

export const COMPONENTS = [
    ...FORM_COMPONENTS,
    ...APP_COMPONENTS,
    ...PAGE_COMPONENTS,
    ...INPUT_COMPONENTS
];
