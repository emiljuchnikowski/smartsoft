import {
  Compiler,
  ComponentFactory,
  Injectable,
  NgModule
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
    const components = options.components.filter(
        comp =>
            !DynamicComponentLoader.declaredComponents.some(dec => dec.component === comp)
    );

    @NgModule({ })
    class DynamicModule {}

    if ((DynamicModule as any)['decorators']) {
      (DynamicModule as any)['decorators'][0]['args'][0].imports = options.imports;
      (DynamicModule as any)['decorators'][0]['args'][0].declarations = components;
      (DynamicModule as any)['decorators'][0]['args'][0].entryComponents = components;
    }

    return await this.compiler
      .compileModuleAndAllComponentsAsync(DynamicModule)
      .then(res => {
        const result = options.components.map(c => {
          let factory = res.componentFactories.find(x => x.componentType === c);

          if (!factory) {
            factory = DynamicComponentLoader.declaredComponents.find(x => x.component === c).factory;
          }

          return {
            component: c,
            factory
          };
        });

        DynamicComponentLoader.declaredComponents = [
          ...DynamicComponentLoader.declaredComponents,
          ...result
        ];

        return result;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}
