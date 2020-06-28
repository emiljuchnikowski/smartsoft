import { Input, Directive } from "@angular/core";

import { IDetailOptions } from '../../../models/interfaces';

@Directive()
export abstract class DetailBaseComponent<T> {
    @Input() options: IDetailOptions<T>;
}
