import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";

import { ListMobileComponent } from './mobile.component';
import {DetailsDirective} from "../../../directives/details/details.directive";

describe('MobileComponent', () => {
  let component: ListMobileComponent<any>;
  let fixture: ComponentFixture<ListMobileComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMobileComponent, DetailsDirective ],
      imports: [ IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule ]
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
