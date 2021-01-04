import {Injectable, Type} from "@angular/core";

import {
    IIconButtonOptions, IListCellPipe, InputBaseComponent
} from "@smartsoft001/angular";

import {ICrudFilterQueryItem} from "./models";

@Injectable()
export class CrudConfig<T> {
    apiUrl: string;
    entity: string;
    type?: any;
    baseQuery?: Array<ICrudFilterQueryItem>;
}

@Injectable()
export class CrudFullConfig<T> extends CrudConfig<T> {
    type: any;
    title: string;
    details?: boolean | {
        components: {
            top?: any,
            bottom?: any
        }
    };
    edit?: boolean;
    add?: boolean;
    remove?: boolean;
    search?: boolean;
    export?: boolean;
    pagination?: { limit: number };
    sort?: boolean | {
        default?: string;
        defaultDesc?: boolean;
    };
    list?: {
        cellPipe?: IListCellPipe<T>;
        components?: {
            top: any
        }
    };
    buttons?: Array<IIconButtonOptions>;
    inputComponents?: {
        [key: string]: Type<InputBaseComponent<T>>
    }
}
