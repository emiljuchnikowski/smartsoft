import {IFieldOptions} from "./interfaces";
import {SYMBOL_FIELD} from "./symbols";

export function getModelFieldKeys<T>(type: T): Array<string> {
    if (!type['__fields']) return [];
    return Object.keys(type['__fields']);
}

export function getModelFieldOptions<T>(instance: T, fieldKey: string): IFieldOptions {
    return Reflect.getMetadata(SYMBOL_FIELD, instance, fieldKey);
}
