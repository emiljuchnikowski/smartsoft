import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule} from "@ionic/angular";

import { DetailFlagComponent } from './flag.component';

describe('DetailFlagComponent', () => {
  let component: DetailFlagComponent<any>;
  let fixture: ComponentFixture<DetailFlagComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFlagComponent ],
      imports: [
          IonicModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
