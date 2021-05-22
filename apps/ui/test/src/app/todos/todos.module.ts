import {Injectable, NgModule, Type} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  IModelLabelOptions,
  IModelLabelProvider, IModelPossibilitiesOptions,
  IModelPossibilitiesProvider,
  ListMode, MODEL_LABEL_PROVIDER, MODEL_POSSIBILITIES_PROVIDER,
  NgrxSharedModule,
  SharedModule
} from "@smartsoft001/angular";
import {AuthModule, AuthSharedModule} from "@smartsoft001/auth-shell-angular";
import {Todo} from "./todo.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {environment} from "../../environments/environment";
import {TodoFacade} from "./todo.facade";
import {Observable, of} from "rxjs";

// export class CellPipe<T> implements IListCellPipe<T> {
//   transform(value: T, columnName): string {
//     if (columnName === 'body') return '<b>test</b>';
//
//     return value[columnName];
//   }
// }


@Injectable()
export class ModelPossibilitiesProvider extends IModelPossibilitiesProvider {
  get(options: IModelPossibilitiesOptions): Observable<{ id: any; text: string }[]> {
    console.log(options);

    return of([
      {id: 1, text: 'test1' },
      {id: 2, text: 'test2' }
    ]);
  }
}

@Injectable()
export class ModelLabelProvider extends IModelLabelProvider {
  get(options: IModelLabelOptions): Observable<string> {
    console.log(options);

    if (options.key === 'body') return of('testLabel');

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
        details: true,
        edit: true,
        add: true,
        remove: true,
        export: true,
        list: {
          // cellPipe: {
          //   transform(value, columnName): string {
          //     //if (columnName === 'body') return '<b>test</b>';
          //
          //     return value[columnName];
          //   }
          // },
          mode: ListMode.desktop
        },
        search: true,
        pagination: { limit: 25 },
      }
    })
  ]
})
export class TodosModule {
  constructor(facade: TodoFacade) {
    facade.do();
  }
}
