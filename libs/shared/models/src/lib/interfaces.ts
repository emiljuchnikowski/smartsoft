import {Observable} from "rxjs";

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
    array = "array",
    password = "password",
    radio = "radio",
    text = "text",
    strings = "strings",
    ints = "ints",
    longText = "longText",
    color = "color",
    logo = "logo",
    check = "check",
    phoneNumber = "phoneNumber",
    pesel = "pesel",
    pdf = "pdf",
    video = "video",
    attachment = "attachment",
    dateRange = "dateRange"
}

export interface ISpecification {
    criteria: any;
}

export interface IModelFilter {
    label?: string;
    fieldType?: FieldType;
    key: string;
    type: '=' | '!=' | '>=' | '<=' | '<' | '>';
    possibilities$?: Observable<{ id: any, text: string }[]>;
}

export interface IModelMetadata {
    titleKey?: string;
    permissions?: Array<string>;
    filters?: Array<IModelFilter>;
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
    enabled?: ISpecification;
}

export interface IFieldEditMetadata extends IFieldModifyMetadata {
    multi?: boolean;
}

export interface IFieldListMetadata {
    order?: number;
    filter?: boolean;
    permissions?: Array<string>;
}

export interface IFieldDetailsMetadata {
    order?: number;
    permissions?: Array<string>;
    enabled?: ISpecification;
}

export interface IModelOptions {
    titleKey?: string;
    filters?: Array<IModelFilter>;
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
    update?: IFieldEditMetadata | boolean;
    list?: IFieldListMetadata | boolean;
    details?: IFieldDetailsMetadata | boolean;
    customs?: Array<IModelMetadataCustom>;
    info?: string;
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
