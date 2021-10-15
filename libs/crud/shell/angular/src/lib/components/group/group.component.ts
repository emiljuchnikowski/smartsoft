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
    @Input() group: ICrudListGroup;
    @Input() listOptions: IListOptions<T>;

    constructor(
        private styleService: StyleService,
        private elementRef: ElementRef,
        private facade: CrudFacade<any>,
        private cd: ChangeDetectorRef
    ) {
        super();
    }

    change(val, item: { id, text: string, show?: boolean }): void {
        this.group.items.filter(i => i.id !== item.id).forEach(i => {
            i.show = false;
        });

        if (val) {
            let current = this.facade.filter.query.find(q => q.key === this.group.key && q.type === '=');

            if (!current) {
                current = {
                    key: this.group.key,
                    type: "=",
                    value: null
                };
                this.facade.filter.query.push(current);
            }

            current.value = item.id;
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
