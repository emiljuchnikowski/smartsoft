import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

import { ListComponent } from './list.component';
import {HardwareService} from "@smartsoft001/angular";

describe('ListComponent', () => {
  let component: ListComponent<any>;
  let fixture: ComponentFixture<ListComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers:[
        {
          provide: HardwareService,
          useValue: {}
        }
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
