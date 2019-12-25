import * as symbols from "../../symbols";
import {IFieldOptions, IModel, ModelType} from "../../models";

export function Field(options: IFieldOptions) {

    return function (target: any, propertyKey: string) {
        // descriptor[symbols.SYMBOL_TYPE] = ModelType.Field;
        // descriptor[symbols.SYMBOL_OPTIONS] = options;

        target[symbols.SYMBOL_FIELDS].push({
            key: propertyKey
        });
    };

}
