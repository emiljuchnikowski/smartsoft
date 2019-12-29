import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";

import { FormStandardComponent } from './standard.component';
import {FormFactory} from "../../../factories";

describe('shared-angular: StandardComponent', () => {
  let component: FormStandardComponent<any>;
  let fixture: ComponentFixture<FormStandardComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStandardComponent ],
      providers: [ FormFactory ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormStandardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
