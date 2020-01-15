import {AbstractControl} from "@angular/forms";

import {IAppProvider} from "../providers";
import {Observable} from "rxjs";
import {IFieldOptions} from "@smartsoft001/models";

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
    hideMenuButton?: boolean;
}

export interface IFormOptions<T> {
    model: T;
    loading$?: Observable<boolean>;
}

export interface IDetailsOptions<T> {
    title?: string;
    type: T;
    edit?: boolean;
    item$: Observable<T>;
    loading$?: Observable<boolean>;
}

export interface IDetailOptions<T> {
    key: string;
    item$: Observable<T>;
    options: IFieldOptions;
    loading$?: Observable<boolean>;
}

export interface IListOptions<T> {
    provider: IListProvider<T>;
    type: any;
    details?: boolean;
    edit?: boolean;
    detailsProvider?: IDetailsProvider<T>;
}

export interface IListProvider<T> {
    getData: (filter) => void;
    list$: Observable<T[]>;
    loading$: Observable<boolean>;
}

export interface IDetailsProvider<T> {
    getData: (id: string) => void;
    clearData: () => void;
    item$: Observable<T>;
    loading$: Observable<boolean>;
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
