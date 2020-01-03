import {IonicModule} from "@ionic/angular";

import {AppSplitPanelComponent} from "./split-panel.component";

export default {
    title: 'AppSplitPanelComponent'
}

export const primary = () => ({
    moduleMetadata: {
        imports: [
            IonicModule
        ]
    },
    component: AppSplitPanelComponent,
    props: {

    }
});
