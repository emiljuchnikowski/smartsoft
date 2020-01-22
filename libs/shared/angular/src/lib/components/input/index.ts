import {InputComponent} from "./input.component";
import {InputErrorComponent} from "./error/error.component";
import {InputTextComponent} from "./text/text.component";
import {InputPasswordComponent} from "./password/password.component";
import {InputFlagComponent} from "./flag/flag.component";
import {InputEnumComponent} from "./enum/enum.component";
import {InputEmailComponent} from "./email/email.component";
import {InputCurrencyComponent} from "./currency/currency.component";
import {InputDateComponent} from "./date/date.component";

export * from './input.component';

export const INPUT_COMPONENTS = [
    InputComponent,
    InputErrorComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputFlagComponent,
    InputEnumComponent,
    InputEmailComponent,
    InputCurrencyComponent,
    InputDateComponent
];
