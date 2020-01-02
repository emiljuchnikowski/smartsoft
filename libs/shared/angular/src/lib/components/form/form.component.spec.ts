import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

import { FormComponent } from "./form.component";
import { FormStandardComponent } from "./standard/standard.component";
import { FormFactory } from "../../factories";
import { InputComponent } from "../input";
import { InputErrorComponent } from "../input/error/error.component";
import { InputTextComponent } from "../input/text/text.component";
import { InputPasswordComponent } from "../input/password/password.component";
import {Model} from "@smartsoft001/models";

describe("shared-angular: FormComponent", () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;
  let formFactory: FormFactory;

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
      providers: [{
        provide: FormFactory, useValue: { create: () => {} }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formFactory = TestBed.get(FormFactory);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should return form from model',  done => {
      @Model({}) class TestModel {}

      const form = new FormGroup({});
      const model = new TestModel();
      const spy = jest.spyOn(formFactory, 'create').mockReturnValueOnce((Promise.resolve(form)));

      component.options = { model };

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(model);
        expect(component.form).toBe(form);

        done();
      });
    });
  });
});
