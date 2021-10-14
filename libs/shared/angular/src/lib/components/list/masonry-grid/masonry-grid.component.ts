import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IEntity} from "@smartsoft001/domain-core";
import {FieldType, getModelFieldsWithOptions} from "@smartsoft001/models";

import {ListBaseComponent} from "../base/base.component";
import { AlertService } from "../../../services/alert/alert.service";
import {AuthService} from "../../../services/auth/auth.service";
import {IListComponentFactories} from "../../../models";
import {IListInternalOptions} from "../list.component";

@Component({
    selector: "smart-list-masonry-grid",
    templateUrl: "./masonry-grid.component.html",
    styleUrls: ["./masonry-grid.component.scss"],
})
export class ListMasonryGridComponent<T extends IEntity<string>>
    extends ListBaseComponent<T>
    implements OnInit, AfterViewInit {

    componentFactories: IListComponentFactories<T>;

    listWithImages$: Observable<{ data: T, image: any }[]>;

    @ViewChild("topTpl", { read: ViewContainerRef, static: true })
    topTpl: ViewContainerRef;

    constructor(
        authService: AuthService,
        router: Router,
        alertService: AlertService,
        cd: ChangeDetectorRef,
        translateService: TranslateService
    ) {
        super(authService, router, alertService, cd, translateService);
    }

    ngOnInit() {}

    ngAfterViewInit(): void {
        this.generateDynamicComponents();
    }

    protected afterInitOptions() {
        super.afterInitOptions();

        const fieldOptions = getModelFieldsWithOptions(new this.type());
        const imageFieldOptions = fieldOptions.find(item => item.options.type === FieldType.image);

        this.listWithImages$ = this.list$.pipe(
            map(list => {
              if (!list) return null;

              return list.map(item => {
                  return {
                      data: item,
                      image: item[imageFieldOptions.key]
                  }
              });
            })
        );
    }

    protected initList(val: IListInternalOptions<T>): void {
        super.initList(val);

        this.componentFactories = val.componentFactories;

        this.generateDynamicComponents();
    }

    private generateDynamicComponents(): void {
        if (!this.componentFactories) return;

        if (this.componentFactories.top && this.topTpl) {
            if (!this.topTpl.get(0)) {
                this.topTpl.createComponent(this.componentFactories.top);
            }
        }
    }
}
