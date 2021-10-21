import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';

import {BaseComponent, IListOptions, StyleService} from "@smartsoft001/angular";
import {IEntity} from "@smartsoft001/domain-core";

import {ICrudListGroup} from "../../models/interfaces";
import {CrudFacade} from "../../+state/crud.facade";

@Component({
    selector: 'smart-crud-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent<T extends IEntity<string>> extends BaseComponent implements OnInit {
    @Input() groups: Array<ICrudListGroup>;
    @Input() listOptions: IListOptions<T>;

    constructor(
        private styleService: StyleService,
        private elementRef: ElementRef,
        private facade: CrudFacade<any>,
        private cd: ChangeDetectorRef
    ) {
        super();
    }

    change(val, item: ICrudListGroup): void {
        this.groups.filter(i => i.value !== item.value || i.key !== item.key).forEach(i => {
            i.show = false;
        });

        if (val) {
            let current = this.facade.filter.query.find(q => q.key === item.key && q.type === '=');

            if (!current) {
                current = {
                    key: item.key,
                    type: "=",
                    value: null
                };
                this.facade.filter.query.push(current);
            }

            current.value = item.value;
            current.hidden = true;

            this.facade.read({
                ...this.facade.filter,
                offset: 0
            });

            setTimeout(() => {
                item.show = val;
                this.cd.detectChanges();
            });
        }
    }

    ngOnInit(): void {
        this.styleService.init(this.elementRef);
    }
}
