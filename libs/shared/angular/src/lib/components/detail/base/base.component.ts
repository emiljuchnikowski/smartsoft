import {Input} from "@angular/core";

import {IDetailOptions} from "@smartsoft001/angular";

export abstract class DetailBaseComponent<T> {
    @Input() options: IDetailOptions<T>;
}
