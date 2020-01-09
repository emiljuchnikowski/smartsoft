import 'jest-preset-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesktopComponent } from './desktop.component';

describe('DesktopComponent', () => {
  let component: ListDesktopComponent;
  let fixture: ComponentFixture<ListDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesktopComponent ]
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
