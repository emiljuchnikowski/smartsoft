import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {ChangeDetectorRef, Component} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import { ListBaseComponent } from './base.component';
import {AuthService, ToastService} from "@smartsoft001/angular";
import {IonicModule} from "@ionic/angular";

describe('BaseComponent', () => {
  @Component({
    template: ''
  })
  class TestComponent extends ListBaseComponent<any> {
    constructor(authService: AuthService, router: Router, translateService: TranslateService, cd: ChangeDetectorRef, toastService: ToastService) {
      super(authService, router, toastService, cd, translateService);
    }

    afterSetProvider(): void {
    }
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      providers: [ ToastService ],
      imports: [ RouterTestingModule, TranslateModule.forRoot(), IonicModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
