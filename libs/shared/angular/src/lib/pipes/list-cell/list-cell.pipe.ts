import {Pipe, PipeTransform, Type} from "@angular/core";
import {Memoize} from "lodash-decorators";
import {TranslateService} from "@ngx-translate/core";

import {FieldType, getModelFieldOptions} from "@smartsoft001/models";

import {IListCellPipe} from "../../models/interfaces";

@Pipe({
    name: 'smartListCell'
})
export class ListCellPipe<T> implements PipeTransform {
    constructor(private readonly translateService: TranslateService) { }

    transform(obj: T, key: string, pipe: IListCellPipe<T>, type?: Type<T>): { value?: any, type?: FieldType } {
        if (!obj) return {};

        let result;

        const fieldType = this.getFieldType(type, key);

        if (!pipe) result = this.getValue(obj, key);
        else result = pipe.transform(obj, key);

        if (!result) return result;

        if (typeof result === 'string') {
            result = this.translateService.instant(result);
        }

        return {
            value: result,
            type: fieldType
        }
    }

    @Memoize()
    private getFieldType(type: Type<T>, key: string): FieldType {
        if (!type) return null;

        const options = getModelFieldOptions(new type(), key);
        return  options?.type;
    }

    private getValue(value: T, key: string) {
        if (key.indexOf('__array') === 0) {
            const info = key.split('.');
            const arrayKey = info[1];
            const index = Number(info[2]);
            const rowKey = info[4];

            return value[arrayKey][index][rowKey];
        }

        return value[key];
    }
}
