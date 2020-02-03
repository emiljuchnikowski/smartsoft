import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

import { InputEmailComponent } from './email.component';

describe('shared-angular: InputEmailComponent', () => {
  let component: InputEmailComponent<any>;
  let fixture: ComponentFixture<InputEmailComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputEmailComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
