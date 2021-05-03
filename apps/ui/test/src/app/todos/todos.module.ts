import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {IListCellPipe, SharedModule} from "@smartsoft001/angular";
import { AuthModule, AuthSharedModule } from "@smartsoft001/auth-shell-angular";
import {Todo} from "./todo.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {environment} from "../../environments/environment";

// export class CellPipe<T> implements IListCellPipe<T> {
//   transform(value: T, columnName): string {
//     if (columnName === 'body') return '<b>test</b>';
//
//     return value[columnName];
//   }
// }

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthSharedModule,
    AuthModule,
    CrudModule.forFeature({
      routing: true,
      config: {
        type: Todo,
        title: 'Zadania',
        entity: "todos",
        apiUrl: "http://localhost:3334/api/notes",
        //apiUrl: environment.apiUrl + "notes",
        baseQuery: [
          { key: 'data.type', type: '!=', value: 'cards', hidden: true }
        ],
        details: true,
        edit: true,
        add: true,
        remove: true,
        export: true,
        list: {
          cellPipe: {
            transform(value, columnName): string {
              //if (columnName === 'body') return '<b>test</b>';

              return value[columnName];
            }
          }
        },
        search: true,
        pagination: { limit: 25 },
      }
    })
  ]
})
export class TodosModule {}
