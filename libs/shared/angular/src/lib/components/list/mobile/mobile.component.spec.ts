import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";

import { ListMobileComponent } from './mobile.component';

describe('MobileComponent', () => {
  let component: ListMobileComponent<any>;
  let fixture: ComponentFixture<ListMobileComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMobileComponent ],
      imports: [ IonicModule.forRoot(), TranslateModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
