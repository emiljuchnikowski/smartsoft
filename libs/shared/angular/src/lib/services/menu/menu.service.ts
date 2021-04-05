import {
  ComponentFactoryResolver,
  Injectable, Injector,
  Provider, ReflectiveInjector,
  ViewContainerRef,
} from "@angular/core";
import { MenuController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  _endContainer: ViewContainerRef;
  _openedEnd = false;

  get openedEnd(): boolean {
    return this._openedEnd;
  }

  constructor(
    private readonly menuCtrl: MenuController,
    private readonly resolver: ComponentFactoryResolver
  ) {}

  async init(endContainer: ViewContainerRef): Promise<void> {
    this._endContainer = endContainer;

    await this.menuCtrl.close("end");
  }

  async openEnd(options: {
    component: any,
    injector: Injector,
  }): Promise<void> {
    this._openedEnd = true;

    const resolver = options.injector.get(ComponentFactoryResolver);

    this._endContainer.clear();
    const factory = resolver.resolveComponentFactory(options.component);
    this._endContainer.createComponent(factory, 0, options.injector);

    await this.menuCtrl.enable(true, "end");
    await this.menuCtrl.open("end");
  }

  async closeEnd(): Promise<void> {
    this._openedEnd = false;

    await this.menuCtrl.close("end");
    await this.menuCtrl.enable(false, "end");

    this._endContainer.clear();
  }
}
