import {Pipe, PipeTransform} from "@angular/core";
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";

@Pipe({
    name: 'smartVirtualDataSource'
})
export class VirtualDataSourcePipe<T> implements PipeTransform {
    transform(value: any[]): TableVirtualScrollDataSource<T> {
        const result = new TableVirtualScrollDataSource<T>(value);

        return result;
    }
}