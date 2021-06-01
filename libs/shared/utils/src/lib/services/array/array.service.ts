import * as _ from "lodash";

export class ArrayService {
    static addItem<T>(array: Array<T>, item: T): Array<T> {
        array.push(item);

        return [...array];
    }

    static removeItem<T>(array: Array<T>, item: T): Array<T> {
        const index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }

        return [...array];
    }

    static sort<T>(array: Array<T>, by: (item: T) => any): Array<T> {
        return _.sortBy(array, by);
    }
}