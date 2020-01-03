import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

import { InputComponent } from './input.component';
import {InputErrorComponent} from "./error/error.component";
import {Field, FieldType, IFieldOptions, Model} from "@smartsoft001/models";
import {InputOptions} from "@smartsoft001/angular";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {InputTextComponent} from "./text/text.component";
import {InputPasswordComponent} from "./password/password.component";

describe('shared-angular: InputComponent', () => {

  const fieldOptions: IFieldOptions = { required: true, type: FieldType.text };
  @Model({})
  class TestClass {
    @Field(fieldOptions) test: any;
  }

  let component: InputComponent<any>;
  let fixture: ComponentFixture<InputComponent<any>>;

  const options: InputOptions<any> = {
    fieldKey: 'test',
    model: new TestClass(),
    control: new FormControl()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent, InputErrorComponent, InputTextComponent, InputPasswordComponent ],
      imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          ReactiveFormsModule,
          CommonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fieldOptions', () => {
    it('should set options', () => {
      component.options = options;

      expect(component.fieldOptions).toStrictEqual(fieldOptions);
    });
  });
});
