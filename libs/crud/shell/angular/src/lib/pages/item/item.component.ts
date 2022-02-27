import {
  ChangeDetectorRef,
  Component, ComponentFactoryResolver,
  ElementRef, NgModuleRef,
  OnInit,
  QueryList, TemplateRef,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Location } from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

import {
  AuthService, CreateDynamicComponent, DetailsService,
  DynamicComponentLoader, DynamicContentDirective, ICellPipe,
  IDetailsOptions,
  IIconButtonOptions,
  IPageOptions, StyleService, ToastService,
} from "@smartsoft001/angular";
import { IEntity } from "@smartsoft001/domain-core";
import {getModelOptions} from "@smartsoft001/models";

import { CrudFacade } from "../../+state/crud.facade";
import { CrudFullConfig } from "../../crud.config";
import { CrudService } from "../../services/crud/crud.service";
import { ICrudFilter } from "../../models/interfaces";
import { IonContent } from "@ionic/angular";
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms"
import {ItemStandardComponent} from "./standard/standard.component";
import { CrudItemPageBaseComponent } from "./base/base.component";
import { PageService } from "../../services/page/page.service";

@Component({
  selector: "smart-crud-item-page",
  template: `
    <smart-page [options]="pageOptions">
      <div #topTpl></div>
      <smart-crud-item-standard-page *ngIf="template === 'default'"
                                     [detailsOptions]="detailsOptions"
                                     [mode]="mode"
                                     [uniqueProvider]="uniqueProvider"
                                     (onPartialChange)="onPartialChange($event)"
                                     (onChange)="onChange($event)"
                                     (onValidChange)="onValidChange($event)"
      >
        <ng-container [ngTemplateOutlet]="contentTpl"></ng-container>
      </smart-crud-item-standard-page>
      <ng-template #contentTpl>
        <ng-content></ng-content>
      </ng-template>
      <div class="dynamic-content"></div>
    </smart-page>
  `
})
export class ItemComponent<T extends IEntity<string>>
    extends CreateDynamicComponent<CrudItemPageBaseComponent<any>>('crud-item-page')
  implements OnInit {
  private _mode: string;

  pageOptions: IPageOptions = {
    title: "",
    showBackButton: true,
    hideMenuButton: true,
  };
  detailsOptions: IDetailsOptions<T>;
  id: string;
  formValue: T;
  formValid = false;
  item: T;
  formPartialValue: Partial<T>;
  uniqueProvider: (values: Record<keyof T, any>) => Promise<boolean>;

  set mode(val: string) {
    this._mode = val;
    this.refreshDynamicInstance();
  }
  get mode(): string {
    return this._mode;
  }


  selected$: Observable<T>;

  @ViewChildren(ItemStandardComponent, { read: ItemStandardComponent }) standardComponents = new QueryList<ItemStandardComponent<any>>();
  @ViewChild(IonContent, { static: true }) content: IonContent;

  @ViewChild("contentTpl", { read: TemplateRef, static: false })
  contentTpl: TemplateRef<any>;

  @ViewChildren(DynamicContentDirective, { read: DynamicContentDirective })
  dynamicContents = new QueryList<DynamicContentDirective>();

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
    private elementRef: ElementRef,
    private toastService: ToastService,
    private pageService: PageService<T>,
    private moduleRef: NgModuleRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private detailsService: DetailsService
  ) {
    super(cd, moduleRef, componentFactoryResolver);

    this.selected$ = this.facade.selected$;
  }

  refreshProperties() {
    this.baseInstance.detailsOptions = this.detailsOptions;
    this.baseInstance.mode = this.mode;
    this.baseInstance.uniqueProvider = this.uniqueProvider;
    this.baseInstance.onPartialChange.pipe(this.takeUntilDestroy).subscribe(val => this.onPartialChange(val));
    this.baseInstance.onChange.pipe(this.takeUntilDestroy).subscribe(val => this.onChange(val));
    this.baseInstance.onValidChange.pipe(this.takeUntilDestroy).subscribe(val => this.onValidChange(val));
  }

  async ngOnInit() {
    this.detailsService.init();
    this.styleService.init(this.elementRef);

    this.pageService.checkPermissions();

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

      this.activeRoute.queryParams
          .pipe(this.takeUntilDestroy)
          .subscribe(({ edit }) => {
            if (edit) {
              this.mode = "update";
            }
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

      if (this.id) {
        filter.query.push({
          key: "id",
          value: this.id,
          type: "!=",
        });
      }
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
        cellPipe: this.config.details ? (this.config.details as {cellPipe?: ICellPipe<T>}).cellPipe : null,
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

    this.refreshDynamicInstance();
  }

  onPartialChange(val: Partial<T>) {
    this.formPartialValue = val;
  }

  onChange(val: T) {
    this.formValue = val;
  }

  onValidChange(val: boolean) {
    this.formValid = val;
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
            text: "add",
            handler: () => {
              if (this.checkFirstInvalid()) {
                return;
              }

              this.facade.create(this.formValue);
              this.location.back();
            },
          },
        ];
      case "update":
        return [
          ...(this.config.details
            ? [
                {
                  icon: "close",
                  text: "cancel",
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
            text: "save",
            handler: () => {
              if (this.checkFirstInvalid()) {
                return;
              }

              this.formPartialValue.id = this.id;
              this.facade.updatePartial(this.formPartialValue as any);

              if (this.config.details) {
                this.mode = "details";
                this.initPageOptions();
              } else {
                this.location.back();
              }
            },
          },
        ];
      case "details":
        return this.config.edit
          ? [
              {
                icon: "create",
                text: "edit",
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

    const prefix = options.titleKey && this.item ? this.removeParagraph(this.item[options.titleKey]) + ' - ' : '';

    switch (this.mode) {
      case "create":
        return "add";
      case "update":
        return prefix + this.translateService.instant("change");
      case "details":
        return prefix + this.translateService.instant("details");
    }
  }

  private removeParagraph(val: string): string {
    if (!val || val.indexOf('<p>') !== 0) return val;

    const div=document.createElement("div");
    div.innerHTML=val;

    const item = div.querySelectorAll("p").item(0);

    return item.innerHTML;
  }

  private checkFirstInvalid(): boolean {
    this.cd.detectChanges();

    const form = this.template === 'default'
        ? this.standardComponents.first.formComponents.first.form
        : this.baseInstance.formComponents.first.form;

    this.cd.detectChanges();

    if (form.valid) return false;

    const invalidFields = [];

    this.getInvalidFields(form, invalidFields, '');

    this.toastService.info({
      title: this.translateService.instant('INPUT.ERRORS.requires'),
      message: invalidFields.slice(0, 3).join('<br/>')
    });

    return true;
  }

  private getInvalidFields(control: AbstractControl, invalidFields: any[], baseField: string, key = null) {
    if (control.valid) return;

    const field = key ? baseField + ' > ' + this.translateService.instant('MODEL.' + key) : baseField;

    if (control.errors?.customMessage) {
      invalidFields.push(field + ` (${control.errors.customMessage})`);
      return;
    }

    if (control instanceof FormControl) {
      invalidFields.push(field);
    }

    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(groupKey => {
        this.getInvalidFields(control.controls[groupKey], invalidFields, field, groupKey);
      });
    }

    if (control instanceof FormArray) {
      control.controls.forEach((c, index) => {
        this.getInvalidFields(c, invalidFields, field + `(${index + 1})`);
      });
    }
  }
}
