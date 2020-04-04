import {Pipe, PipeTransform} from "@angular/core";

import {IListCellPipe} from "../../models/interfaces";

@Pipe({
    name: 'smartListCell'
})
export class ListCellPipe<T> implements PipeTransform {
    transform(obj: T, key: string, pipe: IListCellPipe<T>): any {
        if (!obj) return null;
        else if (!pipe) return obj[key];

        return pipe.transform(obj, key);
    }
}
