import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";

import {IAppProvider} from "../providers";
import {IFieldOptions} from "@smartsoft001/models";
import {IEntity} from "@smartsoft001/domain-core";

export interface IAppOptions {
    provider: IAppProvider;
    menu?: {
        showForAnonymous?: boolean,
        items$?: Observable<IMenuItem[]>
    }
}

export interface IButtonOptions {
    type?: 'submit' | 'button';
    click: () => void;
    loading$?: Observable<boolean>;
}

export interface IDetailsOptions<T extends IEntity<string>> {
    title?: string;
    type: T;
    item$: Observable<T>;
    loading$?: Observable<boolean>;
    editHandler?: (id: string) => void
}

export interface IDetailOptions<T> {
    key: string;
    item$: Observable<T>;
    options: IFieldOptions;
    loading$?: Observable<boolean>;
}

export interface IDetailsProvider<T> {
    getData: (id: string) => void;
    clearData: () => void;
    item$: Observable<T>;
    loading$: Observable<boolean>;
}

export interface IFormOptions<T> {
    model: T;
    mode?: 'create' | 'update' | string;
    loading$?: Observable<boolean>;
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
    showBackButton?: boolean;
    endButtons?: Array<IPageButtonOptions>
}

export interface IPageButtonOptions {
    icon: string;
    handler: () => void;
    disabled$?: Observable<boolean>;
}

export type InputOptions<T> = IInputOptions & IInputFromFieldOptions<T>;

export interface IInputOptions {
    control: AbstractControl;
}

export interface IInputFromFieldOptions<T> {
    model: T;
    fieldKey: string;
    mode?: 'create' | 'update' | string;
}

export interface IListOptions<T> {
    provider: IListProvider<T>;
    type: any;

    details?: boolean;
    detailsProvider?: IDetailsProvider<T>;

    edit?: boolean;
    editOptions?: EditOptions;
}

export interface IEditOptionsForPage {
    routingPrefix: string;
}

export type EditOptions = IEditOptionsForPage;

export interface IListProvider<T> {
    getData: (filter) => void;
    list$: Observable<T[]>;
    loading$: Observable<boolean>;
}


