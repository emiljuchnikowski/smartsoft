export interface IModelOptions {
    create?: any;
    update?: any;
    list?: any;
    details?: any;
    customs?: Array<any>;
    fields?: { [key: string]: any };
}

export interface IFieldOptions {
    required?: boolean;
    // TODO : to fix
    focused?: boolean;
    type?: FieldType;
}

export enum FieldType {
    text = "text",
    password = "password"
}
