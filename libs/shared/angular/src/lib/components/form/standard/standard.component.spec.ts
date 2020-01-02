import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

import { FormStandardComponent } from "./standard.component";
import { FormFactory } from "../../../factories";
import { InputComponent } from "../../input";
import { InputErrorComponent } from "../../input/error/error.component";
import { InputTextComponent } from "../../input/text/text.component";
import { InputPasswordComponent } from "../../input/password/password.component";

describe("shared-angular: StandardComponent", () => {
  let component: FormStandardComponent<any>;
  let fixture: ComponentFixture<FormStandardComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormStandardComponent,
        InputComponent,
        InputErrorComponent,
        InputTextComponent,
        InputPasswordComponent
      ],
      providers: [FormFactory],
      imports: [
        ReactiveFormsModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FormStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
