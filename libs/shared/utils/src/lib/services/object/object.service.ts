export class ObjectService {
    static createByType<T>(obj: any, type: any): T {
        if (!obj) return;

        if (obj instanceof type) return obj;

        const result = new type();

        Object.keys(obj).forEach(key => {
            result[key] = obj[key];
        })

        return result;
    }
}
