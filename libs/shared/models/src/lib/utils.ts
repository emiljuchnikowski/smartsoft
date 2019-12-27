export function getModelFieldKeys<T>(type: T): Array<string> {
    if (!type['__fields']) return [];
    return Object.keys(type['__fields']);
}
