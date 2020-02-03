import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {User} from "./user.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {ChangePasswordComponent} from "./component";
import {environment} from "../../environments/environment";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
      IonicModule,
      SharedModule
  ]
})
export class FakeModule {}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    CrudModule.forFeature({
      routing: true,
      config: {
        type: User,
        title: 'Użytkownicy',
        entity: "users",
        apiUrl: environment.apiUrl + "users",
        details: {
          components: {
            top: ChangePasswordComponent
          }
        },
        edit: true,
        add: true,
      }
    })
  ]
})
export class UsersModule {}
