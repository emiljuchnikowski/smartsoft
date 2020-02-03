import {Input} from "@angular/core";

import { IDetailOptions } from '../../../models/interfaces';

export abstract class DetailBaseComponent<T> {
    @Input() options: IDetailOptions<T>;
}
