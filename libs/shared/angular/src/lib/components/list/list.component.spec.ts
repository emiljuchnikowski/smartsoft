import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {DeviceDetectorModule} from "ngx-device-detector";

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent<any>;
  let fixture: ComponentFixture<ListComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports:[
          DeviceDetectorModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
