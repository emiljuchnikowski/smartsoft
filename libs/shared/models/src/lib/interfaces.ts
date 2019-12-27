export interface IModelOptions {
    create?: any;
    update?: any;
    list?: any;
    details?: any;
    customs?: Array<any>;
    fields?: Array<string>;
}

export interface IFieldOptions {
    required?: boolean;
}
