import {Pipe, PipeTransform, Type} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Memoize} from "lodash-decorators";

import {FieldType, getModelFieldOptions} from "@smartsoft001/models";

import {IListCellPipe} from "../../models/interfaces";
import {FileService} from "../../services/file/file.service";

@Pipe({
    name: 'smartListCell'
})
export class ListCellPipe<T> implements PipeTransform {
    constructor(private translateService: TranslateService, private fileService: FileService) {
    }

    transform(obj: T, key: string, pipe: IListCellPipe<T>, type?: Type<T>): { value?: any, type?: FieldType } {
        if (!obj) return {};

        let result;

        const fieldType = this.getFieldType(type, key);

        if (!pipe) result = obj[key];
        else result = pipe.transform(obj, key);

        if (!result) return result;

        return {
            value: result,
            type: fieldType
        }
    }

    @Memoize()
    private getFieldType(type: Type<T>, key: string): FieldType {
        if (!type) return null;

        const options = getModelFieldOptions(new type(), key);
        return  options.type;
    }
}
