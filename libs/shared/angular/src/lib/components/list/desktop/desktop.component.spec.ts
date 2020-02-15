import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableModule} from "@angular/material";
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";
import {RouterTestingModule} from "@angular/router/testing";

import { ListDesktopComponent } from './desktop.component';
import {ButtonComponent} from "../../button";
import {DetailsDirective} from "../../../directives/details/details.directive";
import {ToastService} from "@smartsoft001/angular";

describe('DesktopComponent', () => {
  let component: ListDesktopComponent<any>;
  let fixture: ComponentFixture<ListDesktopComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ ToastService ],
      declarations: [ ListDesktopComponent, ButtonComponent, DetailsDirective ],
      imports: [ MatTableModule, TranslateModule.forRoot(), IonicModule.forRoot(), RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
