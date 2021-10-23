import {
  ChangeDetectorRef,
  Component,
  ComponentFactory, ComponentFactoryResolver, ElementRef,
  Injector, NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import {
  CreateDynamicComponent,
  DynamicComponentLoader,
  HardwareService,
  IIconButtonOptions,
  IListOptions,
  IPageOptions,
  ListMode,
  MenuService, StyleService,
} from "@smartsoft001/angular";
import { IEntity } from "@smartsoft001/domain-core";
import {
  getModelFieldsWithOptions,
  getModelOptions,
  IFieldEditMetadata,
  IFieldListMetadata,
} from "@smartsoft001/models";

import { CrudFacade } from "../../+state/crud.facade";
import { CrudFullConfig } from "../../crud.config";
import { ICrudFilter } from "../../models/interfaces";
import { ExportComponent } from "../../components/export/export.component";
import { FiltersComponent } from "../../components/filters/filters.component";
import { MultiselectComponent } from "../../components/multiselect/multiselect.component";
import { CrudListPaginationFactory } from "../../factories/list-pagination/list-pagination.factory";
import {PageService} from "../../services/page/page.service";
import {CrudListPageBaseComponent} from "./base/base.component";

@Component({
  selector: "smart-crud-list-page",
  template: `
    <smart-page [options]="pageOptions" *ngIf="filter$ | async">
      <div #topTpl></div>
      <smart-crud-list-standard-page *ngIf="template === 'default'" [listOptions]="listOptions">
      <ng-container [ngTemplateOutlet]="contentTpl"></ng-container>
      </smart-crud-list-standard-page>
      <ng-template #contentTpl>
        <ng-content></ng-content>
      </ng-template>
      <div #customTpl></div>
    </smart-page>
  `
})
export class ListComponent<T extends IEntity<string>>
    extends CreateDynamicComponent<CrudListPageBaseComponent<any>>('crud-list-page')
  implements OnInit
{
  pageOptions: IPageOptions;
  listOptions: IListOptions<T>;
  filter: ICrudFilter;
  links: { next; prev };

  filter$: Observable<ICrudFilter> = this.facade.filter$.pipe(
    tap((filter) => {
      this.filter = filter;
    })
  );

  @ViewChild("topTpl", { read: ViewContainerRef, static: false })
  topTpl: ViewContainerRef;

  constructor(
    private facade: CrudFacade<T>,
    private router: Router,
    private dynamicComponentLoader: DynamicComponentLoader<T>,
    private injector: Injector,
    private cd: ChangeDetectorRef,
    private menuService: MenuService,
    private hardwareService: HardwareService,
    private paginationFacade: CrudListPaginationFactory<T>,
    private styleService: StyleService,
    private elementRef: ElementRef,
    private pageService: PageService<T>,
    public config: CrudFullConfig<T>,
    private moduleRef: NgModuleRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(cd, moduleRef, componentFactoryResolver);

    this.facade.links$.pipe(this.takeUntilDestroy).subscribe((links) => {
      this.links = links;
    });
  }

  refreshProperties(): void {
    this.baseInstance.listOptions = this.listOptions;
  }

  async ngOnInit(): Promise<void> {
    await this.pageService.checkPermissions();

    this.facade.read({
      limit: this.config.pagination ? this.config.pagination.limit : null,
      offset: this.config.pagination ? 0 : null,
      sortBy: this.config.sort ? this.config.sort["default"] : null,
      sortDesc: this.config.sort ? this.config.sort["defaultDesc"] : null,
    });

    const endButtons = this.getEndButtons();

    this.pageOptions = {
      title: this.config.title,
      search: this.config.search
        ? {
            text$: this.filter$.pipe(map((f) => (f ? f.searchText : null))),
            set: (txt) => {
              if (txt !== this.filter.searchText)
                this.facade.read({
                  ...this.filter,
                  searchText: txt,
                  offset: 0,
                });
            },
          }
        : null,
      endButtons: endButtons,
    };

    const compiledComponents =
      await this.dynamicComponentLoader.getComponentsWithFactories({
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
          ...(this.config.list &&
          this.config.list["components"] &&
          this.config.list["components"].top
            ? [this.config.list["components"].top]
            : []),
        ],
      });

    this.listOptions = {
      provider: {
        getData: (filter): void => {
          const global = {
            ...this.filter,
            ...filter,
          };
          this.facade.read(global);
        },
        onChangeMultiSelected: async (list) => {
          if (list.length && !this.menuService.openedEnd) {
            await this.menuService.openEnd({
              injector: this.injector,
              component: MultiselectComponent,
            });
          } else if (!list.length && this.menuService.openedEnd) {
            await this.menuService.closeEnd();
          }

          this.facade.multiSelect(list);
        },
        list$: this.facade.list$,
        loading$: this.facade.loaded$.pipe(map((l) => !l)),
      },
      cellPipe: this.config.list ? this.config.list.cellPipe : null,
      mode: this.config.list?.mode,
      type: this.config.type,
      details: this.config.details
        ? {
            provider: {
              getData: (id) => {
                this.facade.select(id);
              },
              clearData: () => {
                this.facade.unselect();
              },
              item$: this.facade.selected$,
              loading$: this.facade.loaded$.pipe(map((l) => !l)),
            },
            componentFactories: {
              top:
                this.config.details &&
                this.config.details["components"] &&
                this.config.details["components"].top
                  ? compiledComponents.find(
                      (cc) =>
                        cc.component === this.config.details["components"].top
                    ).factory
                  : null,
              bottom:
                this.config.details &&
                this.config.details["components"] &&
                this.config.details["components"].bottom
                  ? compiledComponents.find(
                      (cc) =>
                        cc.component ===
                        this.config.details["components"].bottom
                    ).factory
                  : null,
            },
          }
        : null,
      item:
        this.config.edit || this.config.details
          ? {
              options: {
                routingPrefix: "/" + this.router.routerState.snapshot.url + "/",
                edit: this.config.edit,
              },
            }
          : null,
      remove: this.config.remove
        ? {
            provider: {
              invoke: (id) => this.facade.delete(id),
            },
          }
        : null,
      pagination: await this.paginationFacade.create({
        limit: this.config.pagination.limit,
        provider: {
          getFilter: () => this.filter,
          getLinks: () => this.links,
        },
      }),
      sort: this.config.sort,
    };

    this.cd.detectChanges();

    this.initCloseMenu();
    this.initTopComponent(compiledComponents);

    this.refreshDynamicInstance();
  }

  private initCloseMenu() {
    this.router.events.pipe(this.takeUntilDestroy).subscribe(async () => {
      await this.clear();
    });
  }

  private async clear() {
    await this.menuService.closeEnd();

    this.listOptions = {
      ...this.listOptions,
      select: null,
    };

    this.facade.multiSelect([]);
  }

  private getEndButtons(): Array<IIconButtonOptions> {
    const fieldsWithOptions = getModelFieldsWithOptions(new this.config.type());
    const modelOptions = getModelOptions(this.config.type);

    const showFilters =
      fieldsWithOptions.some(
        (x) => (x.options?.list as IFieldListMetadata)?.filter
      ) || modelOptions?.filters?.length;

    const showMultiEdit =
      this.config.edit &&
      fieldsWithOptions.some(
        (x) => (x.options?.update as IFieldEditMetadata)?.multi
      ) &&
      !this.hardwareService.isMobile &&
      (!this.config?.list?.mode ||
        this.config?.list?.mode === ListMode.desktop);

    return [
      ...(showMultiEdit
        ? [
            {
              icon: "checkbox-outline",
              text: "multi",
              handler: async () => {
                this.listOptions = {
                  ...this.listOptions,
                  select: this.listOptions.select === "multi" ? null : "multi",
                };
                this.facade.multiSelect([]);
                if (this.menuService.openedEnd)
                  await this.menuService.closeEnd();
                this.cd.detectChanges();
              },
            },
          ]
        : []),
      ...(showFilters
        ? [
            {
              icon: "filter-outline",
              text: "filters",
              handler: async () => {
                await this.menuService.openEnd({
                  injector: this.injector,
                  component: FiltersComponent,
                });
              },
            },
          ]
        : []),
      ...(this.config.add
        ? [
            {
              icon: "add",
              text: "add",
              handler: () => {
                this.router.navigate([
                  "/" + this.router.routerState.snapshot.url + "/add",
                ]);
              },
            },
          ]
        : []),
      ...(this.config.export
        ? [
            {
              text: "export",
              icon: "download-outline",
              type: "popover" as "popover",
              component: ExportComponent,
            },
          ]
        : []),
      ...(this.config.buttons ? this.config.buttons : []),
    ];
  }

  private initTopComponent(
    compiledComponents: {
      component: any;
      factory: ComponentFactory<any>;
    }[]
  ) {
    const factory =
      this.config.list &&
      this.config.list["components"] &&
      this.config.list["components"].top
        ? compiledComponents.find(
            (cc) => cc.component === this.config.list["components"].top
          ).factory
        : null;

    setTimeout(() => {
      if (factory && !this.topTpl.get(0)) {
        this.topTpl.createComponent(factory);
      }
    });
  }
}
