import {Injectable} from "@angular/core";

@Injectable()
export class CrudConfig<T> {
    apiUrl: string;
    entity: string;
    type?: any;
}

@Injectable()
export class CrudFullConfig<T> extends CrudConfig<T> {
    type: any;
    title: string;
    details?: boolean | {
        components: {
            top: any
        }
    };
    edit?: boolean;
    add?: boolean;
}
