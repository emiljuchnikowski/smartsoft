import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {ChartsModule} from "ng2-charts";

import { ChartLineComponent } from "./line.component";
import { ChartType, IChartOptions } from "@smartsoft001/angular";

describe("shared-angular: ChartLineComponent", () => {
  let component: ChartLineComponent<any>;
  let fixture: ComponentFixture<ChartLineComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartLineComponent],
      imports: [ChartsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("data", () => {
    it("should correct map data", () => {
      const options = {
        type: ChartType.line,
        data: [
          {
            values: [85, 72, 78, 75, 77, 75],
            label: "Crude oil prices"
          }
        ],
        labels: []
      } as IChartOptions<any>;

      component.options = options;

      expect(component.data).toEqual([
        { data: [85, 72, 78, 75, 77, 75], label: "Crude oil prices" }
      ]);
    });
  });

  describe("labels", () => {
    it("should correct set data", () => {
      const options = {
        type: ChartType.line,
        data: [],
        labels: ["January", "February", "March", "April", "May", "June"]
      } as IChartOptions<any>;

      component.options = options;

      expect(component.labels).toEqual([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June"
      ]);
    });
  });

  describe("coors", () => {
    it("should correct set colors", () => {
      const options = {
        type: ChartType.line,
        data: [],
        labels: [],
        colors: [
          {
            border: 'black',
            background: 'rgba(255,255,0,0.28)',
          },
        ]
      } as IChartOptions<any>;

      component.options = options;

      expect(component.colors).toEqual([
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,255,0,0.28)',
        },
      ]);
    });
  });
});
