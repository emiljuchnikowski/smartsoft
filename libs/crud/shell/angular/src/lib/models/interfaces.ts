import {IModelFilter} from "@smartsoft001/models";

export interface ICrudFilter {
    searchText?: string;
    sortBy?: string;
    sortDesc?: boolean;
    offset?: number;
    limit?: number;
    query?: Array<ICrudFilterQueryItem>
}

export interface ICrudFilterQueryItem extends IModelFilter {
    key: string;
    value: any;
    type: '=' | '!=' | '>=' | '<=' | '<' | '>';
    hidden?: boolean;
}

export interface ICrudCreateManyOptions {
    mode: CrudCreateManyMode
}

export interface ICrudListGroup {
    items: Array<{ id: string, text: string, show?: boolean }>;
    key: string;
    child? : ICrudListGroup;
}

export type CrudCreateManyMode = 'default' | 'replace';
