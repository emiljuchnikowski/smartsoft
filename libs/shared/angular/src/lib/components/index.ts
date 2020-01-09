import {FORM_COMPONENTS} from "./form";
import {APP_COMPONENTS} from "./app";
import {PAGE_COMPONENTS} from "./page";
import {INPUT_COMPONENTS} from "./input";
import {BUTTON_COMPONENTS} from "./button";
import {CARD_COMPONENTS} from "./card";
import {LIST_COMPONENTS} from "./list";

export * from './form';
export * from './app';
export * from './page';
export * from './input';
export * from './button';
export * from './card';
export * from './list';

export const COMPONENTS = [
    ...FORM_COMPONENTS,
    ...APP_COMPONENTS,
    ...PAGE_COMPONENTS,
    ...INPUT_COMPONENTS,
    ...BUTTON_COMPONENTS,
    ...CARD_COMPONENTS,
    ...LIST_COMPONENTS
];
