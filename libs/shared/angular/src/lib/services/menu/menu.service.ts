import {
  ComponentFactoryResolver,
  Injectable, Injector,
  ViewContainerRef,
} from "@angular/core";
import { MenuController } from "@ionic/angular";

/**
 * Only to use in smart-page
 * @requires PageComponent
 */
@Injectable({
  providedIn: "root",
})
export class MenuService {
  _endContainer: ViewContainerRef;
  _openedEnd = false;

  /**
   * @desc checking if the menu is open (menu on the right side of the screen)
   */
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

  /**
   * @desc open menu (menu on the right side of the screen)
   * @param {object} options - use options
   * @param {class} options.component - angular component to render
   * @param {class} options.injector - angular injector to use in component
   */
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

  /**
   * @desc close menu (menu on the right side of the screen)
   */
  async closeEnd(): Promise<void> {
    this._openedEnd = false;

    await this.menuCtrl.close("end");
    await this.menuCtrl.enable(false, "end");

    this._endContainer.clear();
  }
}
