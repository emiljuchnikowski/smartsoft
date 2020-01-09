import {IFieldOptions} from "./interfaces";
import {SYMBOL_FIELD} from "./symbols";

export function getModelFieldKeys<T>(type: T): Array<string> {
    if (!type['__fields']) return [];
    return Object.keys(type['__fields']);
}

export function getModelFieldOptions<T>(instance: T, fieldKey: string): IFieldOptions {
    return Reflect.getMetadata(SYMBOL_FIELD, instance, fieldKey);
}

export function getModelFieldsWithOptions<T>(instance: T): Array<{ key: string, options: IFieldOptions }> {
    const keys = getModelFieldKeys(instance.constructor);

    return keys.map(item => {
        return {
            key: item,
            options: getModelFieldOptions(instance, item)
        }
    });
}
