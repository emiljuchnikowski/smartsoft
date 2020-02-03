import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

import { InputCurrencyComponent } from './currency.component';

describe('shared-angular: InputCurrencyComponent', () => {
  let component: InputCurrencyComponent<any>;
  let fixture: ComponentFixture<InputCurrencyComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCurrencyComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
