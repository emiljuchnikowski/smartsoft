import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";

import { PageStandardComponent } from './standard.component';

describe('shared-angular: PageStandardComponent', () => {
  let component: PageStandardComponent;
  let fixture: ComponentFixture<PageStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageStandardComponent ],
      imports: [
          IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
