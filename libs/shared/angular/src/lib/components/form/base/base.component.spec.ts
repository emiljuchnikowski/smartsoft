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

  describe('fields', () => {
    it('should return fields from model',  done => {
      @Model({}) class TestModel {
        @Field({})
        test1: string;

        @Field({})
        test2: string;
      }

      const model = new TestModel();

      component.options = { model };

      setTimeout(() => {
        expect(component.fields).toStrictEqual([ 'test1', 'test2' ]);

        done();
      });
    });
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

  describe('submit', () => {
    it('should emit event invokeSubmit', done => {

      @Model({}) class TestModel {}

      const form = {};
      const model = new TestModel();
      jest.spyOn(formFactory, 'create').mockReturnValueOnce((Promise.resolve(form as any)));

      component.options = { model };
      component.form = form as any;

      setTimeout(() => {
        const sub = component.invokeSubmit.subscribe(val => {
          sub.unsubscribe();

          expect(val).toBe(component.form.value);
          done();
        });

        component.submit();
      });
    });
  })
});
