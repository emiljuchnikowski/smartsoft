import { AbstractControl } from "@angular/forms";
import {Observable} from "rxjs";

import { IAppProvider } from "../providers/interfaces";
import { IFieldOptions } from "@smartsoft001/models";
import { IEntity } from "@smartsoft001/domain-core";
import {ComponentFactory, PipeTransform} from "@angular/core";
import {IStyle} from "./style";

export interface IAppOptions {
  provider: IAppProvider;
  logo?: string;
  menu?: {
    showForAnonymous?: boolean;
    items$?: Observable<IMenuItem[]>;
  };
  style?: IStyle;
}

export interface IButtonOptions {
  type?: "submit" | "button";
  expand?: "block" | "full" | undefined;
  confirm?: boolean;
  click: () => void;
  loading$?: Observable<boolean>;
}

export interface ICardOptions {
  title?: string;
  buttons?: Array<IIconButtonOptions>;
}

export interface IDetailsComponentFactories<T> {
  top?: ComponentFactory<any>;
  bottom?: ComponentFactory<any>;
}

export interface IDetailsOptions<T extends IEntity<string>> {
  title?: string;
  type: any;
  item$: Observable<T>;
  loading$?: Observable<boolean>;
  itemHandler?: (id: string) => void;
  removeHandler?: (item: T) => void;
  componentFactories?: IDetailsComponentFactories<T>;
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
  control?: AbstractControl;
  mode?: "create" | "update" | string;
  loading$?: Observable<boolean>;
  uniqueProvider?: (values: Record<keyof T, any>) => Promise<boolean>,
  possibilities?: {
    [key: string]: Observable<{ id: any, text: string }[]>;
  }
}

export interface IMenuItem {
  mode?: 'divider' | 'default';
  route?: string;
  caption?: string;
  component?: any;
  icon?: string;
}

export interface IPageOptions {
  title: string;
  hideHeader?: boolean;
  hideMenuButton?: boolean;
  showBackButton?: boolean;
  endButtons?: Array<IIconButtonOptions>;
  search?: { text$: Observable<string>, set: (txt) => void }
}

export interface IIconButtonOptions {
  icon: string;
  handler?: () => void;
  component?: any;
  type?: 'default' | 'popover'
  disabled$?: Observable<boolean>;
}

export type InputOptions<T> = IInputOptions & IInputFromFieldOptions<T>;

export interface IInputOptions {
  control: AbstractControl;
  possibilities$?: Observable<{ id: any, text: string }[]>;
}

export interface IInputFromFieldOptions<T> {
  model: T;
  fieldKey: string;
  mode?: "create" | "update" | string;
}

export interface IListOptions<T> {
  provider: IListProvider<T>;
  type: any;

  pagination?: {
    limit: number,
    loadNextPage: () => Promise<boolean>,
    loadPrevPage: () => Promise<boolean>,
    page$: Observable<number>,
    totalPages$: Observable<number>
  };

  cellPipe?: IListCellPipe<T>;
  componentFactories?: IListComponentFactories<T>,
  sort?: boolean | {
    default?: string;
    defaultDesc?: boolean;
  }

  details?:
    | boolean
    | {
        provider?: IDetailsProvider<T>;
        componentFactories?: IDetailsComponentFactories<T>;
      };

  item?:
    | boolean
    | {
        options?: ItemOptions;
      };

  remove?:
    | boolean
    | {
        provider?: IRemoveProvider<T>;
      };
}

export interface IListCellPipe<T> extends PipeTransform {
  transform(value: T, columnName: string): string;
}

export interface IListComponentFactories<T> {
  top?: ComponentFactory<any>;
}

export interface IItemOptionsForPage {
  routingPrefix: string;
  edit: boolean;
}

export type ItemOptions = IItemOptionsForPage;

export interface IListProvider<T> {
  getData: (filter) => void;
  list$: Observable<T[]>;
  loading$: Observable<boolean>;
}

export interface IRemoveProvider<T> {
  invoke: (id: string) => void;
}
