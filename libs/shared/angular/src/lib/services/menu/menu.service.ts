import {
  ComponentFactoryResolver,
  Injectable,
  Provider, ReflectiveInjector,
  ViewContainerRef,
} from "@angular/core";
import { MenuController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  _endContainer: ViewContainerRef;

  constructor(
    private readonly menuCtrl: MenuController,
    private readonly resolver: ComponentFactoryResolver
  ) {}

  async init(endContainer: ViewContainerRef): Promise<void> {
    this._endContainer = endContainer;

    await this.menuCtrl.close("end");
  }

  async openEnd(options: {
    component: any;
    providers?: Provider[];
  }): Promise<void> {
    let injector = null;

    if (options.providers) {
      injector = ReflectiveInjector.resolveAndCreate(options.providers);
    }

    this._endContainer.clear();
    const factory = this.resolver.resolveComponentFactory(options.component);
    this._endContainer.createComponent(factory, 0, injector);

    await this.menuCtrl.enable(true, "end");
    await this.menuCtrl.open("end");
  }

  async closeEnd(): Promise<void> {
    await this.menuCtrl.close("end");
    await this.menuCtrl.enable(false, "end");

    this._endContainer.clear();
  }
}
