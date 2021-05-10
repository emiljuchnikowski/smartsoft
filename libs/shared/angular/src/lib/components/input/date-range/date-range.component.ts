import {ChangeDetectorRef, Component} from '@angular/core';

import {InputBaseComponent} from "../base/base.component";

@Component({
    selector: 'smart-input-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss'],
})
export class InputDateRangeComponent<T> extends InputBaseComponent<T> {
    constructor(cd: ChangeDetectorRef) {
        super(cd);
    }
}
