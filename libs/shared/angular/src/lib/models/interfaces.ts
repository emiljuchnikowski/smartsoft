import {AbstractControl} from "@angular/forms";

import {IAppProvider} from "../providers";

export interface IAppOptions {
    provider: IAppProvider;
    menu?: {
        showForAnonymous?: boolean
    }
}

export interface IPageOptions {
    title: string;
    hideHeader?: boolean;
}

export interface IFormOptions<T> {
    model: T;
}

export type InputOptions<T> = IInputOptions & IInputFromFieldOptions<T>;

export interface IInputOptions {
    control: AbstractControl;
}

export interface IInputFromFieldOptions<T> {
    type: T;
    fieldKey: string;
}
