import {
  Compiler,
  ComponentFactory,
  Injectable,
  NgModule,
} from "@angular/core";

@Injectable()
export class DynamicComponentLoader<T> {
  static declaredComponents = [];

  constructor(private compiler: Compiler) {}

  async getComponentsWithFactories<C>(options: {
    components: Array<any>;
    imports: Array<any>;
  }): Promise<
    {
      component: any;
      factory: ComponentFactory<any>;
    }[]
  > {

    let components: Array<any> = [];
    components = options.components ? options.components.filter(
      (comp) =>
        !DynamicComponentLoader.declaredComponents.some(
          (dec) => dec.component === comp
        )
    ) : [];
    let imports = [];
    imports = options.imports ? options.imports : [];

    @NgModule({
      imports: imports,
      declarations: components,
      entryComponents: components
    })
    class DynamicModule {}

    const res = this.compiler
      .compileModuleAndAllComponentsSync(DynamicModule);

    const result = options.components.map((c) => {
      let factory = res.componentFactories.find(
          (x) => x.componentType === c
      );

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