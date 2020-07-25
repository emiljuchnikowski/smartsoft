import "jest-preset-angular";

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {ChartsModule} from "ng2-charts";

import { ChartBarComponent } from './bar.component';
import {ChartType, IChartOptions} from "@smartsoft001/angular";

describe('BarComponent', () => {
  let spectator: Spectator<ChartBarComponent<any>>;
  const createComponent = createComponentFactory({
    component: ChartBarComponent,
    imports: [ ChartsModule ]
  });

  beforeEach(async(() => {
    spectator = createComponent();
  }));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
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

      spectator.component.options = options;

      expect(spectator.component.data).toEqual([
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

      spectator.component.options = options;

      expect(spectator.component.labels).toEqual([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June"
      ]);
    });
  });

  describe("colors", () => {
    it("should correct set colors", () => {
      const options = {
        type: ChartType.line,
        data: [],
        labels: [],
        colors: [
          {
            background: 'rgba(255,255,0,0.28)',
          },
        ]
      } as IChartOptions<any>;

      spectator.component.options = options;

      expect(spectator.component.colors).toEqual([
        {
          backgroundColor: 'rgba(255,255,0,0.28)',
        },
      ]);
    });
  });
});
