import {
  Compiler,
  ComponentFactory,
  Injectable,
  NgModule
} from "@angular/core";

@Injectable()
export class DynamicComponentLoader<T> {
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
    @NgModule({
      imports: options.imports,
      declarations: options.components,
      entryComponents: options.components
    })
    class DynamicModule {}

    return await this.compiler
      .compileModuleAndAllComponentsAsync(DynamicModule)
      .then(res => {
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
