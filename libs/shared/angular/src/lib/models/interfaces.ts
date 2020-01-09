import {AbstractControl} from "@angular/forms";

import {IAppProvider} from "../providers";
import {Observable} from "rxjs";

export interface IAppOptions {
    provider: IAppProvider;
    menu?: {
        showForAnonymous?: boolean,
        items$?: Observable<IMenuItem[]>
    }
}

export interface IMenuItem {
    route: string,
    caption: string,
    icon?: string,
}

export interface IPageOptions {
    title: string;
    hideHeader?: boolean;
}

export interface IFormOptions<T> {
    model: T;
    loading$?: Observable<boolean>;
}

export interface IListOptions<T> {
    provider: {
        getData(): Observable<{ data: T[], totalCount: number, links: any }>
    };
    type: any;
}

export type InputOptions<T> = IInputOptions & IInputFromFieldOptions<T>;

export interface IInputOptions {
    control: AbstractControl;
}

export interface IInputFromFieldOptions<T> {
    model: T;
    fieldKey: string;
}

export interface IButtonOptions {
    type?: 'submit' | 'button';
    click: () => void;
    loading$?: Observable<boolean>;
}
