import {ChangeDetectorRef, Input, OnInit, Directive, Type, ViewChild, ViewContainerRef} from "@angular/core";

import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

import {
  FieldType,
  IFieldListMetadata,
  IFieldOptions,
} from "@smartsoft001/models";
import { IEntity } from "@smartsoft001/domain-core";

import { DetailsPage } from "../../../pages/details/details.page";
import {
  IDetailsOptions,
  IListProvider,
  IButtonOptions,
  ICellPipe, DynamicComponentType, PaginationMode,
} from "../../../models/interfaces";
import { IListInternalOptions } from "../list.component";
import { AlertService } from "../../../services/alert/alert.service";
import { AuthService } from "../../../services/auth/auth.service";

@Directive()
export abstract class ListBaseComponent<T extends IEntity<string>>
  implements OnInit {
  static smartType: DynamicComponentType = "list";

  protected provider: IListProvider<T>;
  private _fields: Array<{ key: string; options: IFieldOptions }>;
  private _internalOptions: IListInternalOptions<T>;

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
  cellPipe: ICellPipe<T>;
  loadPrevPage: (event?) => void;
  loadNextPage: (event?) => void;

  list$: Observable<T[]>;
  loading$: Observable<boolean>;
  page$: Observable<number>;
  totalPages$: Observable<number>;

  FieldType = FieldType;
  PaginationMode = PaginationMode;

  type: Type<T>;
  sort:
    | boolean
    | {
        default?: string;
        defaultDesc?: boolean;
      };

  @Input() set options(val: IListInternalOptions<T>) {
    this._internalOptions = val;
    this._fields = val.fields;
    this.provider = val.provider;
    this.sort = val.sort;
    this.cellPipe = val.cellPipe;
    this.selectMode = val.select;
    this.type = val.type;
    this.initKeys();
    this.initList(val);
    this.initLoading();

    if (val.remove) {
      this.removeHandler = async (obj: T) => {
        const alertResult = await this.alertService.show({
          header: this.translateService.instant("OBJECT.confirmDelete"),
          buttons: [
            {
              text: this.translateService.instant("cancel"),
              role: "cancel"
            },
            {
              text: this.translateService.instant("confirm"),
              handler: () => {
                val.remove["provider"].invoke(obj.id);
              }
            }
          ],
          backdropDismiss: false
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
      this.loadNextPage = async (event = null) => {
        await val.pagination.loadNextPage();
        if (event) event.target.complete();

        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      };

      this.loadPrevPage = async (event = null) => {
        await val.pagination.loadPrevPage();
        if (event) event.target.complete();

        setTimeout(() => {
          window.scrollTo(0, 10000);
        });
      };

      this.page$ = val.pagination.page$;
      this.totalPages$ = val.pagination.totalPages$;
    }

    this.afterInitOptions();
  }

  get options(): IListInternalOptions<T> {
    return this._internalOptions;
  }


  @ViewChild("contentTpl", { read: ViewContainerRef, static: true })
  contentTpl: ViewContainerRef;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected alertService: AlertService,
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

  protected initKeys(data: Array<T> = null): void {
    const result = [];

    this._fields
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
      .forEach((field) => {
        if ((field.options.list as IFieldListMetadata).dynamic) {
          if (!data?.length) return;

          (data[0][field.key] as [])
              .map((_, index) =>
                  '__array.' + field.key + '.' + index
                  + '.' + (field.options.list as IFieldListMetadata).dynamic.headerKey
                  + '.' + (field.options.list as IFieldListMetadata).dynamic.rowKey
              )
              .forEach(item => result.push(item));

          return;
        }

        result.push(field.key);
      });

    if (!this.keys || this.keys.length !== result.length) this.keys = result;
  }

  protected initList(val: IListInternalOptions<T>): void {
    this.list$ = this.provider.list$.pipe(
      map((list) => {
        if (!list) return list;
        const result =  list.filter((item) => !this.removed.has(item.id));
        this.initKeys(list);

        return result;
      })
    );
  }

  protected initLoading(): void {
    this.loading$ = this.provider.loading$;
  }

  ngOnInit() {}

  protected afterInitOptions(): void {

  }
}
