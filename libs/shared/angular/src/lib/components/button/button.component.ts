import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ComponentFactoryResolver,
  Input, NgModuleRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import {IButtonOptions} from "../../models/interfaces";
import {DynamicComponentStorageService} from "../../services/dynamic-component-storage/dynamic-component-storage.service";
import {ButtonBaseComponent} from "./base/base.component";

@Component({
  selector: 'smart-button',
  template: `
    <smart-button-standard *ngIf="template === 'default'" [options]="options" [disabled]="disabled">
      <ng-container [ngTemplateOutlet]="contentTpl"></ng-container>
    </smart-button-standard>
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
    <div #customTpl></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements AfterViewInit {
  private _options: IButtonOptions;
  private _disabled: boolean;
  private _instance: ButtonBaseComponent;

  template: "custom" | "default";

  @Input() set options(val: IButtonOptions) {
    this._options = val;
    this.refreshInstance();
  }
  get options(): IButtonOptions { return this._options; }

  @Input() set disabled(val: boolean) {
    this._disabled = val;
    this.refreshInstance();
  }
  get disabled(): boolean { return this._disabled; }

  @ViewChild("customTpl", { read: ViewContainerRef, static: false })
  customTpl: ViewContainerRef;

  @ViewChild("contentTpl", { read: TemplateRef, static: false })
  contentTpl: TemplateRef<any>;

  constructor(
      private cd: ChangeDetectorRef,
      private moduleRef: NgModuleRef<any>,
      private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit(): void {
    const component = DynamicComponentStorageService.get("button", this.moduleRef)[0];
    this.template = component ? "custom" : "default";

    if (component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(component);
      if (!this.customTpl.get(0)) {
        this._instance = this.customTpl.createComponent(factory).instance;
        this.refreshInstance();
        this._instance.contentTpl.createEmbeddedView(this.contentTpl);
      }
    }

    this.cd.detectChanges();
  }

  private refreshInstance() {
    if (!this._instance) return;

    this._instance.options = this.options;
    this._instance.disabled = this.disabled;
  }
}
