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
    ints = "ints",
    longText = "longText",
    color = "color",
    logo = "logo",
    check = "check"
}

export interface IModelMetadata {
    titleKey?: string;
    permissions?: Array<string>;
}

export interface IFieldMetadata extends IFieldModifyMetadata {
    type?: FieldType;
    classType?: any;
    possibilities?: Array<any> | any;
}

export interface IFieldModifyMetadata {
    required?: boolean;
    focused?: boolean;
    confirm?: boolean;
    permissions?: Array<string>;
    unique?: boolean | IFieldUniqueMetadata;
    defaltValue?: () => any;
}

export interface IFieldListMetadata {
    order?: number;
    filter?: boolean;
    permissions?: Array<string>;
}

export interface IFieldDetailsMetadata {
    order?: number;
    permissions?: Array<string>;
}

export interface IModelOptions {
    titleKey?: string;
    create?: IModelModeOptions;
    update?: IModelModeOptions;
    list?: IModelModeOptions;
    details?: IModelModeOptions;
    remove?: IModelModeOptions;
    customs?: Array<IModelModeOptionsCustom>;
}

export interface IModelModeOptions {
    permissions?: Array<string>;
}

export interface IModelModeOptionsCustom extends IModelModeOptions {
    mode: string;
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

export interface IFieldUniqueMetadata {
    withFields?: Array<string>;
}

export interface IFieldCustomMetadata extends IFieldModifyMetadata, IFieldListMetadata {
    mode: string;
}
