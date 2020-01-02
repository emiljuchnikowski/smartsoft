import {InputComponent} from "./input.component";
import {InputErrorComponent} from "./error/error.component";
import {InputTextComponent} from "./text/text.component";
import {InputPasswordComponent} from "./password/password.component";

export * from './input.component';

export const INPUT_COMPONENTS = [
    InputComponent,
    InputErrorComponent,
    InputTextComponent,
    InputPasswordComponent
];
