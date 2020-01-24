import {Input} from "@angular/core";

import { IDetailOptions } from '../../../models';

export abstract class DetailBaseComponent<T> {
    @Input() options: IDetailOptions<T>;
}
