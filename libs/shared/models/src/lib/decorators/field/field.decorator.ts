import 'reflect-metadata';

import {ObjectService} from "@smartsoft001/utils";

import * as symbols from "../../symbols";
import {FieldType, IFieldOptions} from "../../interfaces";

export const Field = FieldDecorator;
export function FieldDecorator(options?: IFieldOptions) {
    return <T>(target: T, key: string) => {

        options = options ? { ...options } : {};

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
               get: function () {
                   if (!this['_' + key] && options.type === FieldType.array) {
                       this['_' + key] = [];
                   }
                   return this['_' + key];
               },
                set: function (v: any) {
                    this['_' + key] = options.type === FieldType.array && v ?
                        v.map(i => ObjectService.createByType(i, options.classType))
                        : ObjectService.createByType(v, options.classType);
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
