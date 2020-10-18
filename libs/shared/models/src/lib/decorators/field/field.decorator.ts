import 'reflect-metadata';

import * as symbols from "../../symbols";
import {FieldType, IFieldOptions} from "../../interfaces";
import {ObjectService} from "@smartsoft001/utils";

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

        if (options.classType) {
            target['_' + key] = target[key];
            delete target[key];

            Object.defineProperty(target, key, {
               get(): any {
                   return target['_' + key];
               },
                set(v: any) {
                    target['_' + key] = ObjectService.createByType(v, options.classType);
                },
                enumerable: true,
                configurable: true
            });

            if (!target.constructor['__properties']) {
                target.constructor['__properties'] = {};
            }

            target.constructor['__properties'][key] = true;
        }

        Reflect.defineMetadata(symbols.SYMBOL_FIELD, options, target, key);
    }
}
