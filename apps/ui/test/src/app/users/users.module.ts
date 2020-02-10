import {Component, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {User} from "./user.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {ChangePasswordComponent} from "./component";
import {environment} from "../../environments/environment";
import {IonicModule} from "@ionic/angular";
import {SERVICES} from "./services";

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
      IonicModule,
      SharedModule
  ]
})
export class FakeModule {}

@Component({
  template: 'test'
})
export class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  providers: [
      ...SERVICES
  ],
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
        remove: true,
        buttons: [
          { type: "popover", icon: 'cloud-upload', component: TestComponent }
        ]
      }
    })
  ]
})
export class UsersModule {}
