import { MonoTypeOperatorFunction, Subject } from "rxjs";
import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  NgModuleRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { takeUntil } from "rxjs/operators";

import { DynamicComponentType } from "../../models";
import { DynamicComponentStorageService } from "../../services/dynamic-component-storage/dynamic-component-storage.service";

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
    baseInstance: T;

    dynamicType: Readonly<DynamicComponentType> = type;
    template: "custom" | "default";

    @ViewChild("customTpl", { read: ViewContainerRef, static: false })
    customTpl: ViewContainerRef;

    @ViewChild("contentTpl", { read: TemplateRef, static: false })
    contentTpl: TemplateRef<any>;

    protected constructor(
      private cd: ChangeDetectorRef,
      private moduleRef: NgModuleRef<any>,
      private componentFactoryResolver: ComponentFactoryResolver
    ) {
      super();
    }

    ngAfterViewInit(): void {
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

      if (component) {
        const factory =
            this.componentFactoryResolver.resolveComponentFactory(component);
        if (this.customTpl && !this.customTpl.get(0)) {
          this.baseInstance = this.customTpl.createComponent(factory).instance;
          this.refreshDynamicInstance();
          this.baseInstance.contentTpl?.createEmbeddedView(this.contentTpl);
        }
      }

      if (this.cd) this.cd.detectChanges();
    }
  }

  return Component as any;
}
