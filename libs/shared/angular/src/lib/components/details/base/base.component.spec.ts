import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {Component} from "@angular/core";

import { DetailsBaseComponent } from './base.component';
import {FormFactory} from "../../../factories";

describe('shared-angular: DetailsBaseComponent', () => {

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'smartsoft-test',
    template: 'test'
  })
  class TestFormBaseComponent extends DetailsBaseComponent<any> {
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
});
