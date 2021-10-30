import { MonoTypeOperatorFunction, Subject } from "rxjs";
import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  NgModuleRef,
  OnDestroy, QueryList,
  TemplateRef,
  ViewChild, ViewChildren,
  ViewContainerRef,
} from "@angular/core";
import { takeUntil } from "rxjs/operators";

import { DynamicComponentType } from "../../models";
import { DynamicComponentStorageService } from "../../services/dynamic-component-storage/dynamic-component-storage.service";
import {DynamicContentDirective} from "../../directives";

@Directive()
export abstract class BaseComponent implements OnDestroy {
  get takeUntilDestroy(): MonoTypeOperatorFunction<any> {
    return takeUntil(this.destroy$);
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

export interface IDynamicComponent<T> extends BaseComponent {
  baseInstance: T;
  template: "custom" | "default";

  refreshProperties(): void;
  refreshDynamicInstance();
}

export function CreateDynamicComponent<
  T extends { contentTpl: ViewContainerRef } = any
>(
  type: DynamicComponentType
): new (
  cd: ChangeDetectorRef,
  moduleRef: NgModuleRef<any>,
  componentFactoryResolver: ComponentFactoryResolver
) => IDynamicComponent<T> {
  @Directive()
  abstract class Component extends BaseComponent implements AfterViewInit {
    private _renderCustom = false;

    baseInstance: T;

    dynamicType: Readonly<DynamicComponentType> = type;
    template: "custom" | "default";

    @ViewChild("contentTpl", { read: TemplateRef, static: false })
    contentTpl: TemplateRef<any>;

    @ViewChildren(DynamicContentDirective, { read: DynamicContentDirective })
    dynamicContents: QueryList<DynamicContentDirective>;

    protected constructor(
      private cd: ChangeDetectorRef,
      private moduleRef: NgModuleRef<any>,
      private componentFactoryResolver: ComponentFactoryResolver
    ) {
      super();
    }

    ngAfterViewInit(): void {
      this.dynamicContents.changes.pipe(
          this.takeUntilDestroy
      ).subscribe(() => {
        this.init();
      });
      this.init();
    }

    refreshDynamicInstance() {
      this.init();

      if (!this.baseInstance) return;
      this.refreshProperties();
    }

    abstract refreshProperties(): void;

    private init(): void {
      const component = DynamicComponentStorageService.get(
          this.dynamicType,
          this.moduleRef
      )[0];
      this.template = component ? "custom" : "default";

      if (component && !this._renderCustom) {
        const factory =
            this.componentFactoryResolver.resolveComponentFactory(component);
        if (this.dynamicContents.first) {
          this._renderCustom = true;
          this.baseInstance = this.dynamicContents.first.container.createComponent(factory).instance;
          this.refreshDynamicInstance();
          this.baseInstance.contentTpl?.createEmbeddedView(this.contentTpl);
        }
      }

      if (this.cd) this.cd.detectChanges();
    }
  }

  return Component as any;
}
