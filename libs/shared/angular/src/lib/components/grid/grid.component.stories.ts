import {storiesOf} from "@storybook/angular";
import {IonicModule} from "@ionic/angular";

import {GridComponent} from "./grid.component";
import {GridRowComponent} from "./row/row.component";
import {GridColumnComponent} from "./column/column.component";

storiesOf('smart-grid', module)
    .add('basic', () => ({
        moduleMetadata: {
            imports: [ IonicModule ],
            declarations: [
                GridComponent,
                GridRowComponent,
                GridColumnComponent
            ]
        },
        template: `
            <smart-grid>
                <smart-grid-row>
                    <smart-grid-column>1</smart-grid-column>
                    <smart-grid-column>2</smart-grid-column>
                    <smart-grid-column>3</smart-grid-column>
                </smart-grid-row>
                <smart-grid-row>
                    <smart-grid-column>4</smart-grid-column>
                    <smart-grid-column>5</smart-grid-column>
                    <smart-grid-column>6</smart-grid-column>
                </smart-grid-row>
            </smart-grid>
        `
    }));
