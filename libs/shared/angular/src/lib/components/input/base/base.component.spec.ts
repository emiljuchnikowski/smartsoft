import "jest-preset-angular";

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangeDetectorRef, Component} from "@angular/core";
import {FormControl} from "@angular/forms";

import {InputBaseComponent} from './base.component';
import {InputOptions} from "../../../models";
import {Field, FieldType, IFieldOptions, Model} from "@smartsoft001/models";

describe('shared-angular: InputBaseComponent', () => {

  @Component({
    selector: 'smart-test',
    template: ''
  })
  class TestComponent extends InputBaseComponent<any> {
    constructor(cd: ChangeDetectorRef) {
      super(cd);
    }
  }

  const fieldOptions: IFieldOptions = { required: true, type: FieldType.text };
  @Model({})
  class TestClass {
    @Field(fieldOptions) test: any;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const options: InputOptions<any> = {
    fieldKey: 'test',
    model: new TestClass(),
    control: new FormControl()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('translateKey', () => {
    it('should return correct value', () => {
      component.options = options;

      expect(component.translateKey).toBe('MODEL.' + options.fieldKey);
    });
  });

  describe('control', () => {
    it('should set control', () => {
      component.options = options;

      expect(component.control).toBe(options.control);
    });
  });
});
