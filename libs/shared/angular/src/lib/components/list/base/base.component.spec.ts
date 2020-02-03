import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

import { ListBaseComponent } from './base.component';
import {Component} from "@angular/core";

describe('BaseComponent', () => {
  @Component({
    template: ''
  })
  class TestComponent extends ListBaseComponent<any> {
    constructor(router: Router) {
      super(router);
    }

    afterSetProvider(): void {
    }
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ RouterTestingModule ]
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
});
