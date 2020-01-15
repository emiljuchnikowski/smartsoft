import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTextComponent } from './text.component';

describe('DetailTextComponent', () => {
  let component: DetailTextComponent<any>;
  let fixture: ComponentFixture<DetailTextComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
