import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { SharedModule as RootSharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {CrudModule} from "@smartsoft001/crud-shell-angular";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RootSharedModule,
    AuthModule,
      CrudModule.forFeature({
        entity: 'users',
        apiUrl: 'http://localhost:8102/users'
      })
  ]
})
export class UsersModule {}
