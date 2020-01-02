import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

import { FormComponent } from "./form.component";
import { FormStandardComponent } from "./standard/standard.component";
import { FormFactory } from "../../factories";
import { InputComponent } from "../input";
import { InputErrorComponent } from "../input/error/error.component";
import { InputTextComponent } from "../input/text/text.component";
import { InputPasswordComponent } from "../input/password/password.component";

describe("shared-angular: FormComponent", () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        FormStandardComponent,
        InputComponent,
        InputErrorComponent,
        InputTextComponent,
        InputPasswordComponent
      ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        TranslateModule,
        CommonModule
      ],
      providers: [FormFactory]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
