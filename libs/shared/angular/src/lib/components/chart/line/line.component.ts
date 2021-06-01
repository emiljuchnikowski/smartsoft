import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ChartDataSets} from "chart.js";
import {Color} from "ng2-charts";
import * as chartJs from "chart.js";

import {ChartBaseComponent} from "../base/base.component";
import {IChartOptions} from "../../../models";

@Component({
  selector: 'smart-chart-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartLineComponent<T> extends ChartBaseComponent<T> {
  data: ChartDataSets[];
  labels: Array<string>;
  lineOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  legend = true;
  plugins = [];
  type = 'line' as chartJs.ChartType;
  colors: Color[];

  @Input() set options(val: IChartOptions<T>) {
    this.setData(val);
    this.setLabels(val);
    this.setColors(val);
  }

  constructor() {
    super();
  }

  private setData(val: IChartOptions<T>): void {
    this.data = val.data.map(i => {
      return {
        data: i.values,
        label: i.label
      }
    });
  }

  private setLabels(val: IChartOptions<T>): void {
    this.labels = val.labels;
  }

  private setColors(val: IChartOptions<T>): void {
    if (!val.colors) return;

    this.colors = val.colors.map(i => {
      return {
        borderColor: i.border,
        backgroundColor: i.background
      }
    });
  }
}
