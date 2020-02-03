import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmailComponent } from './email.component';

describe('DetailEmailComponent', () => {
  let component: DetailEmailComponent<any>;
  let fixture: ComponentFixture<DetailEmailComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
