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
        !DynamicComponentLoader.declaredComponents.some(dec => dec === comp)
    );

    @NgModule({
      imports: options.imports,
      declarations: components,
      entryComponents: components
    })
    class DynamicModule {}

    return await this.compiler
      .compileModuleAndAllComponentsAsync(DynamicModule)
      .then(res => {
        DynamicComponentLoader.declaredComponents = [
          ...DynamicComponentLoader.declaredComponents,
          ...components
        ];

        return options.components.map(c => {
          return {
            component: c,
            factory: res.componentFactories.find(x => x.componentType === c)
          };
        });
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}
