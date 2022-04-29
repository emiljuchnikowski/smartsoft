import {Component, Injectable, Input, NgModule, Type} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  IModelLabelOptions,
  IModelLabelProvider, IModelPossibilitiesOptions,
  IModelPossibilitiesProvider, IModelValidators, IModelValidatorsOptions, IModelValidatorsProvider,
  ListMode, MODEL_LABEL_PROVIDER, MODEL_POSSIBILITIES_PROVIDER, MODEL_VALIDATORS_PROVIDER,
  NgrxSharedModule,
  SharedModule
} from "@smartsoft001/angular";
import {AuthModule, AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {Todo} from "./todo.dto";
import {CrudFacade, CrudModule} from "@smartsoft001/crud-shell-angular";
import {environment} from "../../environments/environment";
import {TodoFacade} from "./todo.facade";
import {Observable, of, tap} from "rxjs";
import {Validators} from "@angular/forms";
import {CustomButtonComponent, CustomCrudListComponent, CustomFormComponent} from "../custom";
import {CustomPageComponent} from "../custom/page.component";
import { IEntity } from "@smartsoft001/domain-core";

// export class CellPipe<T> implements IListCellPipe<T> {
//   transform(value: T, columnName): string {
//     if (columnName === 'body') return '<b>test</b>';
//
//     return value[columnName];
//   }
// }

@Component({
  template: `
    {{ list$ }}
  `
})
export class FakeListTopComponent<T extends IEntity<string>> {
  constructor(private readonly facade: CrudFacade<T>) {
    this.facade.multiSelected$.subscribe(list => {
      console.log(list);
    });
  }

  list$ = this.facade.multiSelected$.pipe(
      tap(i => {
        console.log(i);
      })
  );
}

@Injectable()
export class ModelValidatorsProvider extends IModelValidatorsProvider {
  async get(options: IModelValidatorsOptions): Promise<IModelValidators> {
    if (options.type === Todo && options.key === 'test') {
      return {
        validators: null,
        asyncValidators: null
      }
    }

    if (options.type === Todo && options.key === 'number') {
      return {
        validators: [ Validators.required ],
        asyncValidators: null
      }
    }

    return Promise.resolve(options.base);
  }
}

@Injectable()
export class ModelPossibilitiesProvider extends IModelPossibilitiesProvider {
  get(options: IModelPossibilitiesOptions): Observable<{ id: any; text: string }[]> {
    console.log(options);

    return of([
      {
        id: { id: 1, name: "test" }, text: 'Test 1'
      },
      {
        id: { id: 2, name: "test" }, text: 'Test 2223242343'
      },
      {
        id: { id: 3, name: "test" }, text: 'Test 332432432423'
      },
      {
        id: { id: 4, name: "test" }, text: 'Test 4234234234234235346 234234234'
      },
      {
        id: { id: 5, name: "test" }, text: 'Test 5324324234223 23423423534534 '
      },
      {
        id: { id: 6, name: "test" }, text: 'Test 6'
      }
    ]);
  }
}

@Injectable()
export class ModelLabelProvider extends IModelLabelProvider {
  get(options: IModelLabelOptions): Observable<string> {
    //console.log(options);

    //if (options.key === 'body') return of('testLabel');

    return null;
  }
}

@NgModule({
  providers: [
    TodoFacade,
    {
      provide: MODEL_POSSIBILITIES_PROVIDER,
      useClass: ModelPossibilitiesProvider
    },
    {
      provide: MODEL_LABEL_PROVIDER,
      useClass: ModelLabelProvider
    },
    {
      provide: MODEL_VALIDATORS_PROVIDER,
      useClass: ModelValidatorsProvider
    }
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthSharedModule,
    NgrxSharedModule,
    AuthModule,
    CrudModule.forFeature({
      routing: true,
      config: {
        type: Todo,
        title: 'Zadania',
        entity: "todos",
        //apiUrl: "http://localhost:3334/api/notes",
        apiUrl: environment.apiUrl + "notes",
        baseQuery: [
          { key: 'data.type', type: '!=', value: 'cards', hidden: true }
        ],
        details: {
          cellPipe: {
            transform(value, columnName): string {
              if (columnName === 'body') return '<b>test</b>';

              return value[columnName];
            }
          }
        },
        edit: true,
        add: true,
        //remove: true,
        export: true,
        list: {
          components: {
            multi: FakeListTopComponent
          },
          cellPipe: {
            transform(value, columnName): string {
              if (columnName === 'body') return '<b>test</b>';

              return value[columnName];
            }
          },
          //mode: ListMode.mobile/
          // groups: [
          //   {
          //     key: "number",
          //     value: "qwe",
          //     text: "qwe",
          //     children: [
          //       {
          //         key: "number1",
          //         value: "qwe1",
          //         text: "qwe1",
          //       },
          //       {
          //         key: "number1",
          //         value: "qwe2",
          //         text: "qwe2",
          //       }
          //     ]
          //   }
          // ]
        },
        search: true,
        pagination: { limit: 25 },
      }
    }),
  ],
  declarations: [
    //CustomFormComponent
      //CustomPageComponent
      //CustomButtonComponent
    //CustomCrudListComponent
  ]
})
export class TodosModule {
  constructor(facade: TodoFacade) {
    facade.do();
  }
}
