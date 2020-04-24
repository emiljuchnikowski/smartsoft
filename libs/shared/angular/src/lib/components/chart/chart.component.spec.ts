import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ChartsModule} from "ng2-charts";

import { ChartComponent } from './chart.component';
import {ChartLineComponent} from "./line/line.component";

describe('shared-angular: ChartComponent', () => {
  let component: ChartComponent<any>;
  let fixture: ComponentFixture<ChartComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          ChartComponent,
          ChartLineComponent
      ],
      imports: [
          ChartsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
