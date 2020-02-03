import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {Component} from "@angular/core";

import { FormBaseComponent } from './base.component';
import {FormFactory} from "../../../factories";
import {Field, Model} from "@smartsoft001/models";

describe('shared-angular: FormBaseComponent', () => {

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'smartsoft-test',
    template: 'test'
  })
  class TestFormBaseComponent extends FormBaseComponent<any> {
    constructor() {
      super();
    }
  }

  let component: TestFormBaseComponent;
  let fixture: ComponentFixture<TestFormBaseComponent>;
  let formFactory: FormFactory;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFormBaseComponent ],
      providers: [ FormFactory ],
      imports: [
          ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formFactory = TestBed.get(FormFactory);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('type', () => {
    it('should return type from model',  done => {
      @Model({}) class TestModel {
        @Field({})
        test1: string;

        @Field({})
        test2: string;
      }

      const model = new TestModel();

      component.options = { model };

      setTimeout(() => {
        expect(component.model).toStrictEqual(model);

        done();
      });
    });
  });

});
