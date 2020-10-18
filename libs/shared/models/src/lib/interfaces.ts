export enum FieldType {
    address = "address",
    currency = "currency",
    date = "date",
    dateWithEdit = "dateWithEdit",
    email = "email",
    enum = "enum",
    file = "file",
    flag = "flag",
    int = "int",
    nip = "nip",
    object = "object",
    password = "password",
    radio = "radio",
    text = "text",
    strings = "strings",
    longText = "longText",
    color = "color"
}

export interface IModelMetadata {
    permissions?: Array<string>;
}

export interface IFieldMetadata extends IFieldModifyMetadata {
    type?: FieldType;
    possibilities?: Array<any> | any;
}

export interface IFieldModifyMetadata {
    required?: boolean;
    focused?: boolean;
    confirm?: boolean;
    defaltValue?: () => any;
}

export interface IFieldListMetadata {
    order?: number;
}

export interface IFieldDetailsMetadata {
    order?: number;
}

export interface IModelOptions {
    create?: any;
    update?: any;
    list?: any;
    details?: any;
    customs?: Array<any>;
}

export interface IFieldOptions extends IFieldMetadata {
    create?: IFieldModifyMetadata | boolean;
    update?: IFieldModifyMetadata | boolean;
    list?: IFieldListMetadata | boolean;
    details?: IFieldDetailsMetadata | boolean;
    customs?: Array<IModelMetadataCustom>;
}

export interface IModelMetadataCustom extends IModelMetadata {
    mode: string
}

export interface IFieldCustomMetadata extends IFieldModifyMetadata, IFieldListMetadata {
    mode: string;
}
