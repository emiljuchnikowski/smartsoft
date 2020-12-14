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
        if (!obj) return null;
        else if (!pipe) return this.translateService.instant(obj[key]);

        return this.translateService.instant(pipe.transform(obj, key));
    }
}
