import {ChangeDetectorRef, Component, NgModule, OnInit, Type} from "@angular/core";
import { CommonModule } from "@angular/common";

import {InputBaseComponent, SharedModule} from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {User} from "./user.dto";
import {
  CRUD_MODEL_POSSIBILITIES_PROVIDER,
  CrudModule,
  ICrudModelPossibilitiesProvider
} from "@smartsoft001/crud-shell-angular";
import {ChangePasswordComponent} from "./component";
import {environment} from "../../environments/environment";
import {IonicModule} from "@ionic/angular";
import {SERVICES} from "./services";
import {Observable, of} from "rxjs";

@Component({
  template: `
    <div *ngIf="control">
      <ion-label position="floating">
        {{ translateKey | translate }}
        <ion-text color="danger">
          <span *ngIf="fieldOptions?.required">*</span>
        </ion-text>
      </ion-label>
      <ion-input [formControl]="control" type="email" [attr.autofocus]="fieldOptions?.focused"></ion-input>
    </div>
  `
})
export class CustomInputComponent extends InputBaseComponent<any> implements OnInit {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {}
}

@NgModule({
  declarations: [ChangePasswordComponent, CustomInputComponent],
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
      ...SERVICES,
    {
      provide: CRUD_MODEL_POSSIBILITIES_PROVIDER,
      useValue: {
        get<T>(type: any): { [key: string]: Observable<{ id: any; text: string }[]> } {
          console.log(type);

          return {
            // "permissions2": of([
            //   {id: 'test1', text: 'wartość 1'},
            //   {id: 'test2', text: 'wartość 3'}
            // ])
          };
        }
      } as ICrudModelPossibilitiesProvider
    }
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
            bottom: ChangePasswordComponent
          }
        },
        edit: true,
        add: true,
        remove: true,
        search: true,
        export: true,
        pagination: { limit: 10 },
        sort: {
          default: 'firstName'
        },
        buttons: [
          { type: "popover", icon: 'cloud-upload', component: TestComponent }
        ],
        inputComponents: {
          email: CustomInputComponent
        }
      }
    })
  ]
})
export class UsersModule {}
