import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Location } from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

import {
  AuthService,
  DynamicComponentLoader,
  IDetailsOptions,
  IIconButtonOptions,
  IPageOptions, StyleService,
} from "@smartsoft001/angular";
import { IEntity } from "@smartsoft001/domain-core";
import {getModelOptions} from "@smartsoft001/models";

import { CrudFacade } from "../../+state/crud.facade";
import { CrudFullConfig } from "../../crud.config";
import { CrudService } from "../../services/crud/crud.service";
import { ICrudFilter } from "../../models/interfaces";
import {PageBaseComponent} from "../base/base.component";

@Component({
  selector: "smart-crud-item-page",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent<T extends IEntity<string>> extends PageBaseComponent<T>
  implements OnInit, OnDestroy {
  _saveButtonDisabled = new BehaviorSubject(false);

  pageOptions: IPageOptions = {
    title: "",
    showBackButton: true,
    hideMenuButton: true,
  };
  detailsOptions: IDetailsOptions<T>;
  mode: string;
  id: string;
  formValue: T;
  item: T;
  formPartialValue: Partial<T>;
  uniqueProvider: (values: Record<keyof T, any>) => Promise<boolean>;

  selected$: Observable<T>;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private facade: CrudFacade<T>,
    private service: CrudService<T>,
    private route: ActivatedRoute,
    private dynamicComponentLoader: DynamicComponentLoader<T>,
    private translateService: TranslateService,
    public config: CrudFullConfig<T>,
    private location: Location,
    private cd: ChangeDetectorRef,
    authService: AuthService,
    private styleService: StyleService,
    private elementRef: ElementRef
  ) {
    super(authService, config);

    this.selected$ = this.facade.selected$;
  }

  async ngOnInit() {
    this.styleService.init(this.elementRef);

    await super.ngOnInit();

    if (this.router.routerState.snapshot.url.endsWith("/add")) {
      this.mode = "create";
    } else {
      this.mode = this.config.details ? "details" : "update";

      this.activeRoute.params
        .pipe(this.takeUntilDestroy)
        .subscribe(({ id }) => {
          this.facade.select(id);
          this.id = id;
        });
    }

    this.uniqueProvider = async (values) => {
      const filter: ICrudFilter = {
        query: [],
      };

      Object.keys(values).forEach((key) => {
        filter.query.push({
          key: key,
          value: values[key],
          type: "=",
        });
      });

      const { totalCount } = await this.service.getList(filter).toPromise();

      return !totalCount;
    };

    if (this.config.details) {
      const compiledComponents = await this.dynamicComponentLoader.getComponentsWithFactories(
        {
          components: [
            ...(this.config.details &&
            this.config.details["components"] &&
            this.config.details["components"].top
              ? [this.config.details["components"].top]
              : []),
            ...(this.config.details &&
            this.config.details["components"] &&
            this.config.details["components"].bottom
                ? [this.config.details["components"].bottom]
                : []),
          ],
        }
      );

      this.detailsOptions = {
        type: this.config.type,
        item$: this.facade.selected$,
        componentFactories: {
          top:
            this.config.details &&
            this.config.details["components"] &&
            this.config.details["components"].top
              ? compiledComponents.find(
                  (cc) => cc.component === this.config.details["components"].top
                ).factory
              : null,
          bottom:
              this.config.details &&
              this.config.details["components"] &&
              this.config.details["components"].bottom
                  ? compiledComponents.find(
                  (cc) => cc.component === this.config.details["components"].bottom
                  ).factory
                  : null,
        },
      };
    }

    this.initPageOptions();

    this.facade.selected$.pipe(this.takeUntilDestroy).subscribe(item => {
      this.item = item;
      this.initPageOptions();
      this.cd.detectChanges();
    });
  }

  onPartialChange(val: Partial<T>) {
    this.formPartialValue = val;
  }

  onChange(val: T) {
    this.formValue = val;
  }

  onValidChange(val: boolean) {
    this._saveButtonDisabled.next(!val);
  }

  private initPageOptions(): void {
    this.pageOptions = {
      ...this.pageOptions,
      title: this.getTitle(),
      endButtons: this.getButtons(),
    };
  }

  private getButtons(): Array<IIconButtonOptions> {
    switch (this.mode) {
      case "create":
        return [
          {
            icon: "add",
            handler: () => {
              this.facade.create(this.formValue);
              this.location.back();
            },
            disabled$: this._saveButtonDisabled,
          },
        ];
      case "update":
        return [
          ...(this.config.details
            ? [
                {
                  icon: "close",
                  handler: () => {
                    this.mode = "details";
                    this.initPageOptions();
                  },
                  disabled$: new BehaviorSubject(false),
                },
              ]
            : []),
          {
            icon: "save",
            handler: () => {
              this.formPartialValue.id = this.id;
              this.facade.updatePartial(this.formPartialValue as any);

              this.location.back();
            },
            disabled$: this._saveButtonDisabled,
          },
        ];
      case "details":
        return this.config.edit
          ? [
              {
                icon: "create",
                handler: () => {
                  this.mode = "update";
                  this.initPageOptions();
                },
                disabled$: new BehaviorSubject(false),
              },
            ]
          : [];
    }
  }

  private getTitle(): string {
    const options = getModelOptions(this.config.type);

    const prefix = options.titleKey && this.item ? this.item[options.titleKey] + ' - ' : '';

    switch (this.mode) {
      case "create":
        return "add";
      case "update":
        return prefix + this.translateService.instant("change");
      case "details":
        return prefix + this.translateService.instant("details");
    }
  }
}
