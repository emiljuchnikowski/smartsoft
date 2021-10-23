import {
    Directive,
    Input,
    ViewChild,
    ViewContainerRef
} from "@angular/core";

import {
    BaseComponent,
    DynamicComponentType,
    IListOptions,
} from "@smartsoft001/angular";
import {
    CrudFullConfig,
} from "@smartsoft001/crud-shell-angular";
import {IEntity} from "@smartsoft001/domain-core";

@Directive()
export abstract class CrudListBaseComponent<T extends IEntity<string>> extends BaseComponent {
    static smartType: DynamicComponentType = "crud-list-page";

    @ViewChild("contentTpl", { read: ViewContainerRef, static: true })
    contentTpl: ViewContainerRef;

    @Input()
    listOptions: IListOptions<T>;

    constructor(
        public config: CrudFullConfig<T>,
    ) {
        super();
    }
}