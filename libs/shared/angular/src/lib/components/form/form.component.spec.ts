import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

import { FormComponent } from "./form.component";
import { FormStandardComponent } from "./standard/standard.component";
import { FormFactory } from "../../factories";
import {InputComponent} from "../input";

describe("shared-angular: FormComponent", () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, FormStandardComponent, InputComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
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
