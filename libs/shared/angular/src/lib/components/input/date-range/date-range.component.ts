import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {IDateRange} from "@smartsoft001/domain-core";

import {InputBaseComponent} from "../base/base.component";

@Component({
    selector: 'smart-input-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss'],
})
export class InputDateRangeComponent<T> extends InputBaseComponent<T> implements OnInit {

    constructor(cd: ChangeDetectorRef) {
        super(cd);
    }

    ngOnInit() {}
}
