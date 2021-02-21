import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

import {IListCellPipe} from "../../models/interfaces";

@Pipe({
    name: 'smartListCell'
})
export class ListCellPipe<T> implements PipeTransform {
    constructor(private translateService: TranslateService) {
    }

    transform(obj: T, key: string, pipe: IListCellPipe<T>): any {
        if (!obj) return obj;

        let result = null;

        if (!pipe) result = obj[key];
        else result = pipe.transform(obj, key);

        if (!(typeof result === 'string') || !result) return result;

        return this.translateService.instant(result);
    }
}
