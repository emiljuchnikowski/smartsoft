import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ComponentFactoryResolver, ComponentRef,
    ElementRef,
    Input, NgModuleRef,
    OnInit,
    Renderer2, TemplateRef, ViewChild, ViewContainerRef,
} from "@angular/core";

import {IPageOptions} from "../../models/interfaces";
import {DynamicComponentStorageService} from "../../services/dynamic-component-storage/dynamic-component-storage.service";
import {FormBaseComponent} from "../form";
import {PageBaseComponent} from "./base/base.component";

@Component({
    selector: 'smart-page',
    template: `
        <smart-page-standard *ngIf="template === 'default'" [options]="options">
            <ng-container [ngTemplateOutlet]="contentTpl"></ng-container>
        </smart-page-standard>
        <ng-template #contentTpl>
            <ng-content></ng-content>
        </ng-template>
        <div #customTpl></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit, AfterViewInit {
    private _options: IPageOptions;

    template: "custom" | "default";

    @Input() set options(val: IPageOptions) {
        this._options = val;
    }
    get options(): IPageOptions {
        return this._options;
    }

    @ViewChild("customTpl", { read: ViewContainerRef, static: false })
    customTpl: ViewContainerRef;

    @ViewChild("contentTpl", { read: TemplateRef, static: false })
    contentTpl: TemplateRef<any>;

    constructor(
        private el: ElementRef,
        private cd: ChangeDetectorRef,
        private renderer: Renderer2,
        private moduleRef: NgModuleRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }

    ngAfterViewInit(): void {
        const component = DynamicComponentStorageService.get("page", this.moduleRef)[0];
        this.template = component ? "custom" : "default";

        if (component) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(component);
            if (!this.customTpl.get(0)) {
                const instance: PageBaseComponent = this.customTpl.createComponent(factory).instance;
                instance.options = this.options;
                instance.contentTpl.createEmbeddedView(this.contentTpl);
            }
        }

        this.cd.detectChanges();
    }
}
