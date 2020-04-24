import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from "@angular/core";

import { ChartBaseComponent } from './base.component';

describe('shared-angular: ChartBaseComponent', () => {
  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'smartsoft-test',
    template: 'test'
  })
  class TestFormBaseComponent extends ChartBaseComponent<any> {
    constructor() {
      super();
    }
  }

  let component: TestFormBaseComponent;
  let fixture: ComponentFixture<TestFormBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFormBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
