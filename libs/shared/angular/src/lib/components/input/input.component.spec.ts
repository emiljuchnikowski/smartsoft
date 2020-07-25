import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { InputComponent } from './input.component';
import {Field, FieldType, IFieldOptions, Model} from "@smartsoft001/models";
import {InputOptions} from "@smartsoft001/angular";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {INPUT_COMPONENTS} from "../components.module";
import {PIPES} from "../../pipes/pipes.module";

describe('shared-angular: InputComponent', () => {

  const fieldOptions: IFieldOptions = { required: true, type: FieldType.text };
  @Model({})
  class TestClass {
    @Field(fieldOptions) test: any;
  }

  let spectator: Spectator<InputComponent<any>>;
  const createComponent = createComponentFactory({
    component: InputComponent,
    declarations: [ INPUT_COMPONENTS, PIPES],
    imports: [
      IonicModule.forRoot(),
      TranslateModule.forRoot(),
      ReactiveFormsModule,
      CommonModule
    ]
  });

  const options: InputOptions<any> = {
    fieldKey: 'test',
    model: new TestClass(),
    control: new FormControl()
  };

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('fieldOptions', () => {
    it('should set options', () => {
      spectator.setInput('options', options);

      expect(spectator.component.fieldOptions).toStrictEqual(fieldOptions);
    });
  });
});
