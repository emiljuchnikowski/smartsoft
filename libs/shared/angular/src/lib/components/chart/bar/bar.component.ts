import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {ChartBaseComponent} from "../base/base.component";
import {ChartDataSets} from "chart.js";
import * as chartJs from "chart.js";
import {Color} from "ng2-charts";
import {IChartOptions} from "../../../models";

@Component({
  selector: 'smart-chart-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBarComponent<T> extends ChartBaseComponent<T> {
  data: ChartDataSets[];
  labels: Array<string>;
  barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  legend = true;
  plugins = [];
  type = 'bar' as chartJs.ChartType;
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
