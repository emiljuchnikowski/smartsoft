import {
  Compiler,
  ComponentFactory, ComponentFactoryResolver,
  Injectable, Injector,
  NgModule,
} from "@angular/core";

@Injectable()
export class DynamicComponentLoader<T> {
  static declaredComponents = [];

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {}

  async getComponentsWithFactories<C>(options: {
    components: Array<any>;
  }): Promise<
    {
      component: any;
      factory: ComponentFactory<any>;
    }[]
  > {
    let components: Array<any> = [];

    components = options.components.filter(
      (comp) =>
        !DynamicComponentLoader.declaredComponents.some(
          (dec) => dec.component === comp
        )
    ) || [];

    const result = options.components.map((c) => {
      let factory = this.resolver.resolveComponentFactory(c);

      if (!factory) {
        factory = DynamicComponentLoader.declaredComponents.find(
            (x) => x.component === c
        ).factory;
      }

      return {
        component: c,
        factory,
      };
    });

    DynamicComponentLoader.declaredComponents = [
      ...DynamicComponentLoader.declaredComponents,
      ...result,
    ];

    return result;
  }
}
