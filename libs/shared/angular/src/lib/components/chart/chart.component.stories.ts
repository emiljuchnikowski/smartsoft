import { ChartsModule } from "ng2-charts";

import { ChartComponent } from "./chart.component";
import { ChartType, IChartOptions } from "../../models/chart";
import { ChartLineComponent } from "./line/line.component";

export default {
  title: "ChartComponent"
};

export const line = () => ({
  moduleMetadata: {
    imports: [ChartsModule],
    declarations: [ChartLineComponent]
  },
  component: ChartComponent,
  props: {
    options: {
      type: ChartType.line,
      labels: ["January", "February", "March", "April", "May", "June"],
      data: [{ values: [85, 72, 78, 75, 77, 75], label: "Crude oil prices" }],
      colors: [
        {
          border: "black",
          background: "rgba(255,255,0,0.28)"
        }
      ]
    } as IChartOptions<any>
  }
});
