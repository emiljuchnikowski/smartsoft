import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileComponent } from './file.component';

describe('InputFileComponent', () => {
  let component: InputFileComponent<any>;
  let fixture: ComponentFixture<InputFileComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
