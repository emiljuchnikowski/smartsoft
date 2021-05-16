import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IEntity} from "@smartsoft001/domain-core";
import {FieldType, getModelFieldsWithOptions} from "@smartsoft001/models";

import {ListBaseComponent} from "../base/base.component";
import {ToastService} from "../../../services/toast/toast.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
    selector: "smart-list-masonry-grid",
    templateUrl: "./masonry-grid.component.html",
    styleUrls: ["./masonry-grid.component.scss"],
})
export class ListMasonryGridComponent<T extends IEntity<string>>
    extends ListBaseComponent<T>
    implements OnInit {

    listWithImages$: Observable<{ data: T, image: any }[]>

    constructor(
        authService: AuthService,
        router: Router,
        toastService: ToastService,
        cd: ChangeDetectorRef,
        translateService: TranslateService
    ) {
        super(authService, router, toastService, cd, translateService);
    }

    ngOnInit() {}

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
}
