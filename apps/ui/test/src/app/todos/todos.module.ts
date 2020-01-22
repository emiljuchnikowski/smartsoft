import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {Todo} from "./todo.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";

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
        apiUrl: "http://localhost:8102/todos",
        details: true,
        edit: true,
        add: true
      }
    })
  ]
})
export class TodosModule {}
