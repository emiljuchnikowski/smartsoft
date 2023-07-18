import {Observable} from "rxjs";

enum FieldType {
    address = "address",
    currency = "currency",
    date = "date",
    dateTime = "dateTime",
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
    phoneNumberPl = "phoneNumberPl",
    pesel = "pesel",
    pdf = "pdf",
    video = "video",
    attachment = "attachment",
    dateRange = "dateRange",
    image = "image",
    float = "float"
}

interface ISpecification {
    criteria: any;
}

interface IModelFilter {
    label?: string;
    fieldType?: FieldType;
    key: string;
    type: '=' | '!=' | '>=' | '<=' | '<' | '>' | '~=';
    possibilities$?: Observable<{ id: any, text: string }[]>;
}

interface IModelStep {
    number: number;
    name: string;
}

interface IModelMetadata {
    titleKey?: string;
    permissions?: Array<string>;
    filters?: Array<IModelFilter>;
}

interface IFieldMetadata extends IFieldModifyMetadata {
    type?: FieldType;
    classType?: any;
    possibilities?: Array<any> | any;
}

interface IFieldModifyMetadata {
    required?: boolean;
    focused?: boolean;
    confirm?: boolean;
    permissions?: Array<string>;
    unique?: boolean | IFieldUniqueMetadata;
    defaltValue?: () => any;
    enabled?: ISpecification;
    hide?: boolean;
    /**
     * @desc - Model step configuration
     */
    step?: IModelStep;
}

interface IFieldEditMetadata extends IFieldModifyMetadata {
    multi?: boolean;
}

interface IFieldListMetadata {
    order?: number;
    filter?: boolean;
    permissions?: Array<string>;
    /**
     * Configuration for dynamic list table data
     * @param {string} dynamic.headerKey - column header object key
     * @param {string} dynamic.rowKey - column row value object key
     */
    dynamic?: { headerKey: string, rowKey: string }
}

interface IFieldDetailsMetadata {
    order?: number;
    permissions?: Array<string>;
    enabled?: ISpecification;
}

interface IModelOptions {
    titleKey?: string;
    filters?: Array<IModelFilter>;
    create?: IModelModeOptions;
    update?: IModelModeOptions;
    list?: IModelModeOptions;
    details?: IModelModeOptions;
    remove?: IModelModeOptions;
    customs?: Array<IModelModeOptionsCustom>;
    /**
     * @desc - Allow field data
     */
    export?: boolean;
    /**
     * @desc - Allow import field data
     */
    import?: boolean;
}

interface IModelModeOptions {
    permissions?: Array<string>;
    enabled?: ISpecification;
}

interface IModelModeOptionsCustom extends IModelModeOptions {
    mode: string;
}

interface IFieldOptions extends IFieldMetadata {
    create?: IFieldModifyMetadata | boolean;
    update?: IFieldEditMetadata | boolean;
    list?: IFieldListMetadata | boolean;
    details?: IFieldDetailsMetadata | boolean;
    customs?: Array<IModelMetadataCustom>;
    search?: boolean;
    info?: string;
}

interface IModelMetadataCustom extends IModelMetadata {
    mode: string
}

interface IFieldUniqueMetadata {
    withFields?: Array<string>;
}

interface IFieldCustomMetadata extends IFieldModifyMetadata, IFieldListMetadata {
    mode: string;
}

export {
    FieldType,
    ISpecification,
    IModelFilter,
    IModelStep,
    IModelMetadata,
    IFieldMetadata,
    IFieldModifyMetadata,
    IFieldEditMetadata,
    IFieldListMetadata,
    IFieldDetailsMetadata,
    IModelOptions,
    IModelModeOptions,
    IModelModeOptionsCustom,
    IFieldOptions,
    IModelMetadataCustom,
    IFieldUniqueMetadata,
    IFieldCustomMetadata
};
