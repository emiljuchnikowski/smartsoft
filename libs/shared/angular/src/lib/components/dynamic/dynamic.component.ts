import {
  Component,
  ComponentFactoryResolver,
  Input,
  ViewContainerRef,
} from "@angular/core";

@Component({
  selector: "smart-dynamic",
  template: ` <ng-template #tpl></ng-template> `,
})
export class DynamicComponent {
  constructor(
    private vf: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Input() set component(val: any) {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(val);
    this.vf.createComponent(resolver);
  }
}
