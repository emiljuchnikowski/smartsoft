import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWithEditComponent } from './date-with-edit.component';

describe('DateWithEditComponent', () => {
  let component: DateWithEditComponent;
  let fixture: ComponentFixture<DateWithEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWithEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWithEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
