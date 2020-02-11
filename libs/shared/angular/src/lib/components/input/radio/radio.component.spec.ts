import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRadioComponent } from './radio.component';

describe('InputRadioComponent', () => {
  let component: InputRadioComponent<any>;
  let fixture: ComponentFixture<InputRadioComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
