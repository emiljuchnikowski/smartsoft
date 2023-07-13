import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {ChartBaseComponent} from "../base/base.component";
import * as chartJs from "chart.js";
import {IChartOptions} from "../../../models";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'smart-chart-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBarComponent<T> extends ChartBaseComponent<T> {
  data: any[];
  labels: Array<string>;
  barOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0,
      }
    }
  };
  legend = true;
  plugins = [];
  type = 'bar' as chartJs.ChartType;
  colors: any[];

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
