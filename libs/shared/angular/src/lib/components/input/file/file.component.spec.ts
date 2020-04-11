import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

import { InputFileComponent } from './file.component';

describe('InputFileComponent', () => {
  let component: InputFileComponent<any>;
  let fixture: ComponentFixture<InputFileComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFileComponent ],
      imports: [ TranslateModule.forRoot(), IonicModule.forRoot(), ReactiveFormsModule ]
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
