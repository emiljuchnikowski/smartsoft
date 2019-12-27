import 'reflect-metadata';

import * as symbols from "../../symbols";
import {IFieldOptions, IModelOptions} from "../../interfaces";

export const Field = FieldDecorator;
export function FieldDecorator(options: IFieldOptions) {
    return <T>(target: T, key: string) => {

        // TODO : unit tests
        if (Reflect.hasMetadata(symbols.SYMBOL_MODEL, target)) {
            const targetOptions: IModelOptions = Reflect.getMetadata(symbols.SYMBOL_MODEL, target);
            if (!targetOptions.fields) {
                targetOptions.fields = [];
            }

            targetOptions.fields.push(key);
        }

        Reflect.defineMetadata(symbols.SYMBOL_FIELD, options, target, key);
    }
}
