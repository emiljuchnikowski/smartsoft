import { ChartsModule } from "ng2-charts";
import {storiesOf} from "@storybook/angular";

import {ChartBarComponent} from "@smartsoft001/angular";

import { ChartComponent } from "./chart.component";
import { ChartType, IChartOptions } from "../../models/chart";
import { ChartLineComponent } from "./line/line.component";

const COMPONENTS = [
  ChartLineComponent,
  ChartBarComponent
];

storiesOf("smart-char", module)
    .add('line', () => ({
      moduleMetadata: {
        imports: [ChartsModule],
        declarations: COMPONENTS
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
    }))
    .add('bar', () => ({
        moduleMetadata: {
            imports: [ChartsModule],
            declarations: COMPONENTS
        },
        component: ChartComponent,
        props: {
            options: {
                type: ChartType.bar,
                labels: ["January", "February", "March", "April", "May", "June"],
                data: [
                    { values: [85, 72, 78, 75, 77, 75], label: "Test 1" },
                    { values: [12, 43, 34, 34, 65, 34], label: "Test 2" }
                    ],
                colors: [
                    {
                        background: "rgba(255,255,0,0.28)"
                    },
                    {
                        background: "red"
                    }
                ]
            } as IChartOptions<any>
        }
    }));
