import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";

import { InputFlagComponent } from './flag.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('shared-angular: InputFlagComponent', () => {
  let component: InputFlagComponent<any>;
  let fixture: ComponentFixture<InputFlagComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFlagComponent ],
      imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
