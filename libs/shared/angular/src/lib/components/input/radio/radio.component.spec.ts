import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";

import { InputRadioComponent } from './radio.component';

describe('InputRadioComponent', () => {
  let component: InputRadioComponent<any>;
  let fixture: ComponentFixture<InputRadioComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRadioComponent ],
      imports: [ReactiveFormsModule, TranslateModule, IonicModule]
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
