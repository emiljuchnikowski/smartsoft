import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CdkTableModule} from "@angular/cdk/table";
import {TranslateModule} from "@ngx-translate/core";

import { ListDesktopComponent } from './desktop.component';

describe('DesktopComponent', () => {
  let component: ListDesktopComponent<any>;
  let fixture: ComponentFixture<ListDesktopComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesktopComponent ],
      imports: [ CdkTableModule, TranslateModule.forRoot() ]
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
