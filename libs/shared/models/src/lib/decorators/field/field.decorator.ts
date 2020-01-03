import 'reflect-metadata';

import * as symbols from "../../symbols";
import {FieldType, IFieldOptions} from "../../interfaces";

export const Field = FieldDecorator;
export function FieldDecorator(options: IFieldOptions) {
    return <T>(target: T, key: string) => {

        options = { ...options };

        if (!target.constructor['__fields']) {
            target.constructor['__fields'] = {};
        }

        target.constructor['__fields'][key] = true;

        if (!options.type && key === 'password') {
            options.type = FieldType.password;
        } else if (!options.type) {
            options.type = FieldType.text;
        }

        Reflect.defineMetadata(symbols.SYMBOL_FIELD, options, target, key);
    }
}
