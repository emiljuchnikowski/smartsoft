import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
    name: 'smartListHeader'
})
export class ListHeaderPipe<T> implements PipeTransform {
    constructor(private translateService: TranslateService) {
    }

    transform(data: T, key: string): string {
        if (key.indexOf('__array') === 0) {
            const info = key.split('.');
            const arrayKey = info[1];
            const index = Number(info[2]);
            const headerKey = info[3];

            return data[0][arrayKey][index][headerKey];
        }

        return this.translateService.instant('MODEL.' + key);
    }
}