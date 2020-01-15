import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";

import { DetailComponent } from './detail.component';
import {DETAIL_COMPONENTS} from "@smartsoft001/angular";

describe('DetailComponent', () => {
  let component: DetailComponent<any>;
  let fixture: ComponentFixture<DetailComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ...DETAIL_COMPONENTS ],
      imports: [ TranslateModule.forRoot(), IonicModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
