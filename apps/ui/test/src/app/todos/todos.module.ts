import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {IListCellPipe, SharedModule} from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {Todo} from "./todo.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {environment} from "../../environments/environment";

class CellPipe<T> implements IListCellPipe<T> {
  transform(value: T, columnName): string {
    if (columnName === 'body') return '<b>test</b>';

    return value[columnName];
  }
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    CrudModule.forFeature({
      routing: true,
      config: {
        type: Todo,
        title: 'Zadania',
        entity: "todos",
        apiUrl: environment.apiUrl + "cards",
        details: true,
        edit: true,
        add: true,
        list: {
          cellPipe: new CellPipe()
        },
        search: true,
        pagination: { limit: 25 },
      }
    })
  ]
})
export class TodosModule {}
