import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordComponent } from './password.component';
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

describe('shared-angular: InputPasswordComponent', () => {
  let component: InputPasswordComponent<any>;
  let fixture: ComponentFixture<InputPasswordComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPasswordComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
