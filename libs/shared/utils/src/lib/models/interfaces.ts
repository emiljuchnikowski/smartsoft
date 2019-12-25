import * as symbols from "../symbols";

export enum ModelType {
    Model = "Model",
    Field = "Field"
}

export interface IModel {
    [symbols.SYMBOL_TYPE]: ModelType.Model;
    [symbols.SYMBOL_OPTIONS]: IModelOptions;
    [symbols.SYMBOL_FIELDS]: Array<IModelField>
}

export interface IModelOptions {
    create?: any;
    update?: any;
    list?: any;
    details?: any;
    customs?: Array<any>;
}

export interface IModelField {
    key: string;
}

export interface IFieldOptions {
    required?: boolean;
}
