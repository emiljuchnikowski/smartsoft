import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMobileComponent } from './mobile.component';

describe('MobileComponent', () => {
  let component: ListMobileComponent;
  let fixture: ComponentFixture<ListMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMobileComponent ]
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
