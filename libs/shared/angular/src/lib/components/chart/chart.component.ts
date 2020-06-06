import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";

import { ChartType, IChartOptions } from "../../models/chart";

@Component({
  selector: "smart-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent<T> implements OnInit {
  @Input() options: IChartOptions<T>;

  ChartType = ChartType;

  constructor() {}

  ngOnInit() {}
}
