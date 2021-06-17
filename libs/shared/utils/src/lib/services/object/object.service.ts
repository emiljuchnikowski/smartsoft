export class ObjectService {
    /***
     * Create object with data
     * @param data {object} - data to set
     * @param type {type} - new type
     * @return - new type object
     */
    static createByType<T>(data: any, type: any): T {
        if (!data) return;

        if (data instanceof type) return data;

        const result = new type();

        Object.keys(data).forEach(key => {
            result[key] = data[key];
        })

        return result;
    }

    /***
     * Remove object type from data
     * @param obj {object} - object
     * @return - object without type
     */
    static removeTypes(obj: any): any {
        if (!obj) return obj;

        const stringObj = JSON.stringify(obj);

        return JSON.parse(stringObj);
    }
}
