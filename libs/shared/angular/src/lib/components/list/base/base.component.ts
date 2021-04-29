import { ChangeDetectorRef, Input, OnInit, Directive } from "@angular/core";
import {
  getModelOptions,
  IFieldListMetadata,
  IFieldOptions,
} from "@smartsoft001/models";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { IEntity } from "@smartsoft001/domain-core";
import { map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

import { DetailsPage } from "../../../pages/details/details.page";
import {
  IDetailsOptions,
  IListProvider,
  IButtonOptions,
  IListCellPipe,
} from "../../../models/interfaces";
import { IListInternalOptions } from "../list.component";
import { ToastService } from "../../../services/toast/toast.service";
import { AuthService } from "../../../services/auth/auth.service";

@Directive()
export abstract class ListBaseComponent<T extends IEntity<string>>
  implements OnInit {
  protected provider: IListProvider<T>;
  private _fields: Array<{ key: string; options: IFieldOptions }>;

  detailsComponent;
  selectMode?: 'multi';
  detailsComponentProps: IDetailsOptions<T>;
  select: (id: string) => void;
  unselect: () => void;
  itemHandler: (id: string) => void;
  removeHandler: (item: T) => void;
  detailsButtonOptions: IButtonOptions;
  removed: Set<string> = new Set<string>();
  keys: Array<string>;
  cellPipe: IListCellPipe<T>;
  loadPrevPage: (event) => void;
  loadNextPage: (event) => void;

  list$: Observable<T[]>;
  loading$: Observable<boolean>;
  page$: Observable<number>;
  totalPages$: Observable<number>;
  sort:
    | boolean
    | {
        default?: string;
        defaultDesc?: boolean;
      };

  @Input() set options(val: IListInternalOptions<T>) {
    this._fields = val.fields;
    this.provider = val.provider;
    this.sort = val.sort;
    this.cellPipe = val.cellPipe;
    this.selectMode = val.select;
    this.initKeys();
    this.initList(val);
    this.initLoading();

    if (val.remove) {
      this.removeHandler = (obj: T) => {
        let timeoutId;
        if (val.remove["provider"]) {
          timeoutId = setTimeout(() => {
            val.remove["provider"].invoke(obj.id);
          }, 5000);
        }

        this.removed.add(obj.id);
        this.initList(val);
        this.cd.detectChanges();
        this.toastService.info({
          message: this.translateService.instant("OBJECT.deleted"),
          duration: 5000,
          buttons: [
            {
              text: this.translateService.instant("undo"),
              position: "end",
              handler: () => {
                if (timeoutId) clearTimeout(timeoutId);
                this.removed.delete(obj.id);
                this.initList(val);
                this.cd.detectChanges();
              },
            },
          ],
        });
      };
    }

    if (val.item) {
      if (!val.item["options"]) throw Error("Must set edit options");

      this.itemHandler = (id) => {
        if (val.item["options"].routingPrefix) this.router.navigate([val.item["options"].routingPrefix, id]);
        if (val.item["options"].select) val.item["options"].select(id);
      };
    }

    if (val.details) {
      if (!val.details["provider"]) throw Error("Must set details provider");

      this.detailsComponent = DetailsPage;
      this.detailsComponentProps = {
        item$: val.details["provider"].item$,
        type: val.type,
        loading$: val.details["provider"].loading$,
        itemHandler: this.itemHandler,
        removeHandler: this.removeHandler,
        componentFactories: val.details["componentFactories"],
      };

      this.select = val.details["provider"].getData;
      this.unselect = val.details["provider"].clearData;
    }

    if (val.pagination) {
      this.loadNextPage = async (event) => {
        await val.pagination.loadNextPage();
        event.target.complete();

        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      };

      this.loadPrevPage = async (event) => {
        await val.pagination.loadPrevPage();
        event.target.complete();

        setTimeout(() => {
          window.scrollTo(0, 10000);
        });
      };

      this.page$ = val.pagination.page$;
      this.totalPages$ = val.pagination.totalPages$;
    }
  }

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected toastService: ToastService,
    protected cd: ChangeDetectorRef,
    protected translateService: TranslateService
  ) {
    this.detailsButtonOptions = {
      loading$: this.loading$,
      click: () => {
        this.unselect();
      },
    };
  }

  protected initKeys(): void {
    this.keys = this._fields
      .filter((field) => {
        if (
          field.options.list &&
          (field.options.list as IFieldListMetadata).permissions
        ) {
          return this.authService.expectPermissions(
            (field.options.list as IFieldListMetadata).permissions
          );
        }

        return true;
      })
      .map((field) => field.key);
  }

  protected initList(val: IListInternalOptions<T>): void {
    this.list$ = this.provider.list$.pipe(
      map((list) => {
        if (!list) return list;
        return list.filter((item) => !this.removed.has(item.id));
      })
    );
  }

  protected initLoading(): void {
    this.loading$ = this.provider.loading$;
  }

  ngOnInit() {}
}
