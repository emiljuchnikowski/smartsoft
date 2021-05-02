import {Pipe, PipeTransform, Type} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Memoize} from "lodash-decorators";

import {FieldType, getModelFieldOptions} from "@smartsoft001/models";

import {IListCellPipe} from "../../models/interfaces";
import {FileService} from "../../services";

@Pipe({
    name: 'smartListCell'
})
export class ListCellPipe<T> implements PipeTransform {
    constructor(private translateService: TranslateService, private fileService: FileService) {
    }

    transform(obj: T, key: string, pipe: IListCellPipe<T>, type?: Type<T>): any {
        if (!obj) return obj;

        let result;

        if (!pipe) result = obj[key];
        else result = pipe.transform(obj, key);

        if (!result) return result;

        const fieldType = this.getFieldType(type, key);

        switch (fieldType) {
            case FieldType.image:
                return `<img height="50" src="${ this.fileService.getUrl(result.id) }">`

            default:
                if (!(typeof result === 'string')) return result;
                return this.translateService.instant(result);
        }
    }

    @Memoize()
    private getFieldType(type: Type<T>, key: string): FieldType {
        if (!type) return null;

        const options = getModelFieldOptions(new type(), key);
        return  options.type;
    }
}
