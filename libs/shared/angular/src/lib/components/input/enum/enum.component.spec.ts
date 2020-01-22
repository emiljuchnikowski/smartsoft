import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";

import { InputEnumComponent } from './enum.component';
import {PIPES} from "../../../pipes";

describe('shared-angular: InputEnumComponent', () => {
  let component: InputEnumComponent<any>;
  let fixture: ComponentFixture<InputEnumComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputEnumComponent, PIPES ],
      imports: [
          TranslateModule.forRoot(),
          IonicModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
