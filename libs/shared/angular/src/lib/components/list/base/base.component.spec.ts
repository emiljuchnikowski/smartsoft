import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaseComponent } from './base.component';
import {Component} from "@angular/core";

describe('BaseComponent', () => {
  @Component({
    template: ''
  })
  class TestComponent extends ListBaseComponent<any> {
    afterSetProvider(): void {
    }
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

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
});
